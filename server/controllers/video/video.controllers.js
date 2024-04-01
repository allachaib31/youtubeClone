//controllers
const { storage } = require("../../db/firebaseConfig");
const videoModel = require("../../models/video");
const channelModel = require("../../models/channel");
const { socketController } = require("../../app");
const crypto = require("crypto");
const {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");

exports.uploadVideo = async (req, res) => {
  // const handleio = socketService.getInstance();
  const storageRefVideo = ref(storage, "/uploads/video/" + crypto.randomUUID());
  try {
    const video = req.file;
    const uploadTask = uploadBytesResumable(storageRefVideo, video.buffer, {
      contentType: video.mimetype,
    });
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload progress: ${progress}%`);
        socketController.emitRequestEvent(
          "progress",
          progress.toFixed(2),
          req.user.id
        );
      },
      (error) => {
        console.error("Error uploading file:", error);
        res.status(500).send("Error uploading file.");
      },
      async () => {
        // Upload completed successfully
        console.log("File uploaded successfully.");
        // Get the download URL
        const downloadUrlVideo = await getDownloadURL(storageRefVideo);
        return res.status(200).send({
          status: "success",
          msg: downloadUrlVideo,
        });
      }
    );
  } catch (err) {
    await deleteObject(storageRefVideo);
    return res.status(400).send({
      status: "error",
      message: "try again !!",
    });
  }
};

exports.saveVideo = async (req, res) => {
  const { title, description, videoUrl, categories } = req.body;
  const id = req.user.id;
  const storageRefVideo = ref(storage, videoUrl);
  try {
    const channel = await channelModel.findOne({
      idUser: id,
    });
    if (!channel) {
      return res.status(400).send({
        status: "error",
        message: "You don't have a channel!!",
      });
    }
    const video = new videoModel({
      title,
      description,
      videoUrl,
      categories,
      idChannel: channel._id,
    });
    await video.save();
    return res.status(200).send({
      status: "success",
      message: "your video is saved!!",
    });
  } catch (err) {
    await deleteObject(storageRefVideo);
    return res.status(400).send({
      status: "error",
      message: "try again!!",
    });
  }
};
exports.updateVideo = async(req,res) => {
  const { title, description, categories, idVideo} = req.body;
  const id = req.user.id;
  try{
    const video = await videoModel.findById(idVideo,{
      title, 
      description,
      categories
    }).populate("idChannel");
    if(!video){
      return res.status(400).send({
        status: "error",
        message: "your video is not existe!!",
      });
    }
    if(video.idChannel.idUser != id){
      return res.status(400).send({
        status: "error",
        message: "you don't have the permission for update this video!!",
      });
    }
    return res.status(200).send({
      status: "success",
      message: "your video is updated succeffuly!!",
    });
  }catch(err){
    console.log(err)
    return res.status(400).send({
      status: "error",
      message: "try again!!",
    });
  }
}
exports.deletedVideo = async (req, res) => {
  const { videoId } = req.query;
  const id = req.user.id;
  try {
    const video = await videoModel
      .findById(videoId)
      .populate("idChannel");
      if(!video){
        return res.status(400).send({
          status: "error",
          message: "your video is not existe!!",
        });
      }
      if(video.idChannel.idUser != id){
        return res.status(400).send({
          status: "error",
          message: "you don't have the permission for delete this video!!",
        });
      }
      const storageRefVideo = ref(storage, video.videoUrl);
      await deleteObject(storageRefVideo);
      return res.status(200).send({
        status: "success",
        message: "your video is deleted!!",
      });
  } catch (err) {
    return res.status(400).send({
      status: "error",
      message: "try again!!",
    });
  }
};

exports.getVideo = async (req, res) => {
  const { videoId } = req.query;
  try{
    const video = await videoModel.findById(videoId).populate("idChannel");
    if(!video){
      return res.status(404).send({
        status: "error",
        message: "the video is not existe!!",
      });
    }
    return res.status(200).send({
      status: "success",
      result: video,
    });
  }catch(err){
    return res.status(400).send({
      status: "error",
      message: "try again!!",
    });
  }
}