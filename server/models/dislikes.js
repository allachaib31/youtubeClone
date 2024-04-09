const mongoose = require("mongoose");

const dislikeSchema = new mongoose.Schema({
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

const dislikeModel = mongoose.model("dislikes", dislikeSchema);

module.exports = dislikeModel;