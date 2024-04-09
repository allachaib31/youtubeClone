//controllers
const { storage } = require("../../db/firebaseConfig");
const videoModel = require("../../models/video");
const channelModel = require("../../models/channel");
const historyModel = require("../../models/history");
const { socketController } = require("../../app");
const crypto = require("crypto");
const {
  ref,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const commentModel = require("../../models/comment");

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
      msg: "try again !!",
    });
  }
};

exports.saveVideo = async (req, res) => {
  const { title, description, videoUrl, categories } = req.body;
  console.log(req.body);
  console.log(req.file);
  const id = req.user.id;
  const storageRefVideo = ref(storage, videoUrl);
  const storageRefThumbnail = ref(
    storage,
    "/uploads/thumbnail/" + crypto.randomUUID()
  );
  try {
    const channel = await channelModel.findOne({
      idUser: id,
    });
    if (!channel) {
      return res.status(404).send({
        status: "error",
        msg: "You don't have a channel!!",
      });
    }
    console.log(req.files);
    const thumbnail = req.file;
    await uploadBytes(storageRefThumbnail, thumbnail.buffer, {
      contentType: thumbnail.mimetype,
    });
    const downloadUrlThumbnail = await getDownloadURL(storageRefThumbnail);
    const video = new videoModel({
      title,
      description,
      videoUrl,
      categories: categories.split(","),
      thumbnail: downloadUrlThumbnail,
      idChannel: channel._id,
    });
    await video.save();
    return res.status(200).send({
      status: "success",
      msg: "your video is saved!!",
    });
  } catch (err) {
    await deleteObject(storageRefVideo);
    await deleteObject(storageRefThumbnail);
    return res.status(400).send({
      status: "error",
      msg: "try again!!",
    });
  }
};

exports.updateVideo = async (req, res) => {
  const { title, description, categories, idVideo } = req.body;
  const id = req.user.id;
  try {
    const video = await videoModel
      .findById(idVideo, {
        title,
        description,
        categories,
      })
      .populate("idChannel");
    if (!video) {
      return res.status(404).send({
        status: "error",
        msg: "your video is not existe!!",
      });
    }
    if (video.idChannel.idUser != id) {
      return res.status(400).send({
        status: "error",
        msg: "you don't have the permission for update this video!!",
      });
    }
    return res.status(200).send({
      status: "success",
      msg: "your video is updated succeffuly!!",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      status: "error",
      msg: "try again!!",
    });
  }
};

exports.deletedVideo = async (req, res) => {
  const { videoId } = req.query;
  const id = req.user.id;
  try {
    const video = await videoModel.findById(videoId).populate("idChannel");
    if (!video) {
      return res.status(404).send({
        status: "error",
        msg: "your video is not existe!!",
      });
    }
    if (video.idChannel.idUser != id) {
      return res.status(400).send({
        status: "error",
        msg: "you don't have the permission for delete this video!!",
      });
    }
    const storageRefVideo = ref(storage, video.videoUrl);
    const storageRefThumbnail = ref(storage, video.thumbnail);
    await deleteObject(storageRefVideo);
    await deleteObject(storageRefThumbnail);
    await video.deleteOne();
    return res.status(200).send({
      status: "success",
      msg: "your video is deleted!!",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      status: "error",
      msg: "try again!!",
    });
  }
};

exports.getVideo = async (req, res) => {
  const { videoId } = req.query;
  const { id } = req.user;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10; 
  try {
    const video = await videoModel.findById(videoId).populate("idChannel");
    if (!video) {
      return res.status(404).send({
        status: "error",
        msg: "the video is not existe!!",
      });
    }
    const comments = await commentModel
      .find({
        idVideo: videoId,
      }).populate("idChannel")
      .skip((page - 1) * limit)
      .limit(limit);
      video.vues++;
      await video.save();
      const listVideo = await videoModel.find({
        categories: { $in: video.categories}
      });
      const history = new historyModel({
        idVideo: videoId,
        idUser: id
    });
    await history.save();
    return res.status(200).send({
      status: "success",
      result: video,
      listVideo,
      comments,
    });
  } catch (err) {
    console.log(err)
    return res.status(400).send({
      status: "error",
      msg: "try again!!",
    });
  }
};

exports.getVideos = async (req, res) => {
  try {
    const videos = await videoModel.find().sort({ _id: -1 });
    return res.status(200).send({
      status: "success",
      videos
    })
  } catch (err) {
    return res.status(400).send({
      status: "error",
      msg: "try again !!"
    });
  }
}