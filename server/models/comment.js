const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "videos",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  comment: {
    type: String,
    maxLength: 5000,
    required: true,
  },
  date: {
    type: Date,
    default: Date().now(),
  },
});

const commentModel = mongoose.model("comments", commentSchema);

module.exports = commentModel;
