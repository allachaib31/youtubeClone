const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  idVideo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "videos",
  },
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const likeModel = mongoose.model("likes", likeSchema);

module.exports = likeModel;