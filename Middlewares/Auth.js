let jwt = require("jsonwebtoken");
let Authrization = {
  Middleware: (req, res, next) => {
    try {
      let userLogin = req.headers.authorization.split(" ")[1];
      let token = jwt.verify(userLogin, process.env.JWT_SECRET);
      if (token._doc) {
        next();
      }
    } catch (error) {
      res.status(500).json({
        message: "Please! Login to continue",
      });
    }
  },
};

module.exports = Authrization;
