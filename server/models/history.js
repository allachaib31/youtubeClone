const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
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

const historyModel = mongoose.model("history", historySchema);

module.exports = historyModel;