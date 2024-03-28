const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    maxLength: 255,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    maxLength: 255,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    maxLength: 1024,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
