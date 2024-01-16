let mongoose = require("mongoose");
let Task = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
let UserTask = mongoose.model("UserTask", Task);
module.exports = UserTask;
