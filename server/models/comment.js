const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  idVideo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "videos",
  },
  idChannel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "channels",
  },
  comment: {
    type: String,
    maxLength: 5000,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const commentModel = mongoose.model("comments", commentSchema);

module.exports = commentModel;
