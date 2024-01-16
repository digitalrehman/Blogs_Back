const express = require("express");
const route = express.Router();

const Authrization = require("../Middlewares/Auth");
const controllers = require("../controllers/controller");

route.get("/check", Authrization.Middleware, controllers.check);

// SignUp API
route.post("/signup", controllers.signup);

// LogIn API
route.post("/signin", controllers.signin);

// Task APIs
route.post("/sendTask", Authrization.Middleware, controllers.postapi);
route.get("/getTask", Authrization.Middleware, controllers.getapi);
route.put("/updateTask", Authrization.Middleware, controllers.updateapi);
route.delete("/deleteTask/:id", Authrization.Middleware, controllers.deleteapi);

module.exports = route;
