const express = require("express");
const multer = require("multer");
const authMiddleware = require("../../middleware/auth.js");
const {
  uploadVideo,
  saveVideo,
  updateVideo,
  deletedVideo,
  getVideo,
  getVideos
} = require("../../controllers/video/video.controllers.js");

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
});

router.use(authMiddleware);

// Post Methods
router.post(
  "/video/uploadVideo",
  upload.single("video"),
  uploadVideo
);
router.post("/video/saveVideo", upload.single("thumbnail"),saveVideo);

// Update Methods
router.put("/video/updateVideo", updateVideo)

// Delete Methods
router.delete("/video/deleteVideo",deletedVideo);

// Get Methods
router.get("/video/getVideo", getVideo);
router.get("/video/getVideos", getVideos);

module.exports = router;
