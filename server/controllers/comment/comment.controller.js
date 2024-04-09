const commentModel = require("../../models/comment");
const channelModel = require("../../models/channel");
const videoModel = require("../../models/video");

exports.addComment = async (req, res) => {
  const { text, idVideo } = req.body;
  const id = req.user.id;
  try {
    const channel = await channelModel.findOne({
      idUser: id,
    });
    if (!channel) {
      return res.status(404).send({
        status: "error",
        message: "You don't have a channel!!",
      });
    }
    const comment = new commentModel({
      idVideo,
      idChannel: channel._id,
      comment: text,
    });
    const video = await videoModel.findById(idVideo);
    await comment.save();
    video.comment++;
    await video.save();
    return res.status(200).send({
      status: "success",
      message: "your comment is saved!!",
    });
  }catch (err) {
    return res.status(400).send({
      status: "error",
      message: "try again!!",
    });
  }
};

exports.removeComment = async (req, res) => {};

exports.getComments = async (req, res) => {};
