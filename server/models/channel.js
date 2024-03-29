const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 255,
    required: true,
  },
  description: {
    type: String,
    maxLength: 5000,
    required: true,
  },
  coverImage: {
    type: String,
    maxLength: 2024,
    required: true,
  },
  profileImage: {
    type: String,
    maxLength: 2024,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    unique: true,
  },
});

const channelModel = mongoose.model("channels", channelSchema);

module.exports = channelModel;
