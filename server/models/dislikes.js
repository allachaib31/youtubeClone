const mongoose = require("mongoose");

const dislikeSchema = new mongoose.Schema({
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

const dislikeModel = mongoose.model("dislikes", dislikeSchema);

module.exports = dislikeModel;