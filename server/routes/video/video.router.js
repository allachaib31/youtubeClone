const express = require("express");
const multer = require("multer");
const authMiddleware = require("../../middleware/auth.js");
const { uploadVideo } = require("../../controllers/video/video.controllers.js");

const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage(),
});

router.use(authMiddleware);

router.post("/video/uploadVideo",upload.single("video"),uploadVideo);

module.exports = router;