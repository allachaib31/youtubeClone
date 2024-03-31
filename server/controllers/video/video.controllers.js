//controllers
const { storage } = require("../../db/firebaseConfig");
const { socketController } = require('../../app');
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
        socketController.emitRequestEvent("progress", progress.toFixed(2),req.user.id);
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
        res.status(200).send({
          status: "success",
          msg: downloadUrlVideo,
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
};
