const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    maxLength: 255,
    required: true,
  },
  description: {
    type: String,
    maxLength: 5000,
    required: true,
  },
  videoUrl: {
    type: String,
    unique: true,
    required: true,
  },
  vues: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  comment: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  idChannel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "channels",
  },
});

const videoModel = mongoose.model('videos', videoSchema);

module.exports = videoModel;