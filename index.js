require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const App = express();
const PORT = 3500;
const cors = require("cors");
const router = require("./router/route");
mongoose.connect(process.env.MONGODB_URI)
  .then((res) => console.log("Connect To MongoDB"))
  .catch((err) => console.log("Inter Server Error"));
const corsOptions = {
  origin: "https://blogs-app.pages.dev",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
App.use(cors(corsOptions));

App.use(express.json());
App.use("/api", router);
App.listen(PORT, () => console.log(`Start localhost:${PORT}`));
