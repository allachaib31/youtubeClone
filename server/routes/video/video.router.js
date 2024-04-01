const express = require("express");
const multer = require("multer");
const authMiddleware = require("../../middleware/auth.js");
const {
  uploadVideo,
  saveVideo,
  updateVideo,
  deletedVideo,
  getVideo
} = require("../../controllers/video/video.controllers.js");

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
});

router.use(authMiddleware);

// Post Methods
router.post(
  "/video/uploadVideo",
  authMiddleware,
  upload.single("video"),
  uploadVideo
);
router.post("/video/saveVideo", authMiddleware, saveVideo);

// Update Methods
router.put("/video/updateVideo", authMiddleware, updateVideo)

// Delete Methods
router.delete("/video/deleteVideo", authMiddleware,deletedVideo);

// Get Methods
router.get("/video/getVideo", authMiddleware, getVideo);

module.exports = router;
