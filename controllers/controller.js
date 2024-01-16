const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Model/Schema");
const UserTask = require("../Model/TaskSchema");

const controllers = {
  check: (req, res) => {
    res.json({
      status: true,
      message: "Successfully Connected",
    });
  },
  signup: (req, res) => {
    let { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      res.status(401).json({
        status: false,
        message: "All Fields Are Required",
      });
      return;
    }
    User.findOne({ email })
      .then(async (checkEmil) => {
        if (checkEmil) {
          res.status(404).json({
            status: false,
            message: "Email Already Exist",
          });
        } else {
          let bcryptPassword = await bcrypt.hash(password, 10);
          let senddata = {
            name,
            email,
            password: bcryptPassword,
            phone,
          };
          User.create(senddata)
            .then((response) => {
              res.status(200).json({
                status: true,
                message: `${response.name}, Succesfully Signup`,
              });
            })
            .catch((error) => {
              res.status(400).json({
                status: false,
                message: "SignUp Process Fail",
              });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          message: "SignUp Process Fail",
        });
      });
  },
  signin: (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        status: false,
        message: "Please Enter Email And Password",
      });
      return;
    }
    User.findOne({ email })
      .then(async (checkEmil) => {
        if (!checkEmil) {
          res.status(404).json({
            status: false,
            message: "User Not Found",
          });
        } else {
          let decryptPassword = await bcrypt.compare(
            password,
            checkEmil.password
          );
          if (!decryptPassword) {
            res.status(400).json({
              status: false,
              message: "Incorrect Email or Password",
            });
          } else {
            let Token = {
              ...checkEmil,
            };

            let checkToken = jwt.sign(Token, process.env.JWT_SECRET);

            res.status(200).json({
              status: true,
              message: `Welcomw To ${checkEmil.name}! `,
              Token: checkToken,
            });
          }
        }
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          message: "SignIn Process Fail",
        });
      });
  },
  postapi: (req, res) => {
    let { title, description, status } = req.body;
    if (!title || !description || !status) {
      res.status(404).json({
        status: false,
        message: "Required Feild Are Missing",
      });
      return;
    }
    let objTask = {
      title,
      description,
      status,
    };
    UserTask.create(objTask)
      .then((response) => {
        res.status(200).json({
          status: true,
          message: "Task Created Successfully",
        });
      })
      .catch((err) => {
        res.status(404).json({
          status: false,
          message: "Task Not Created",
        });
      });
  },


  getapi: (req, res) => {
    UserTask.find()
      .then((response) => {
        res.status(200).json({
          status: true,
          message: "Task List",
          data: response,
        });
      })
      .catch((err) => {
        res.status(404).json({
          status: false,
          message: "Task Not List",
        });
      });
  },
  updateapi: (req, res) => {
    let { id, ...updated } = req.body;
    UserTask.findByIdAndUpdate(id, updated, { new: true })
      .then((response) => {
        res.status(200).json({
          status: true,
          message: "Task Updated Successfully",
          data: response,
        });
      })
      .catch((err) => {
        res.status(404).json({
          status: false,
          message: "Task Not Updated",
        });
      });
  },
  deleteapi: (req, res) => {
    let { id } = req.params;
    if (!id) {
      res.status(404).json({
        status: false,
        message: "Task Not Deleted",
      });
      return;
    }
    UserTask.findByIdAndDelete(id)
      .then((response) => {
        res.status(200).json({
          status: true,
          message: "Task Deleted Successfully",
          data: response,
        });
      })
      .catch((err) => {
        res.status(404).json({
          status: false,
          message: "Task Not Deleted",
        });
      });
  },
};
module.exports = controllers;
