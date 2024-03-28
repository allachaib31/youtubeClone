const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "videos",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  date: {
    type: Date,
    default: Date().now()
  }
});

const likeModel = mongoose.model("likes", likeSchema);

module.exports = likeModel;