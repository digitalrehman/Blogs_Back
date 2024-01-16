const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  created_on: {
    type: Date,
    default: Date.now(),
  },
});
let User = mongoose.model("User", schema);
module.exports = User;
