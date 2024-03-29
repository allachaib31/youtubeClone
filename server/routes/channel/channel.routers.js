const express = require("express");
const multer = require("multer");
const authMiddleware = require("../../middleware/auth");
const {
  addChannel,
  updateChannel,
  updateChannelProfileImage,
  updateChannelCoverImage,
  deleteChannel,
  getChannel,
} = require("../../controllers/channel/channel.controller");

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
});

router.use(authMiddleware);

// Post Methods
router.post(
  "/channel/addChannel",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  addChannel
);

// Update Methods
router.put("/channel/updateChannel", updateChannel);
router.patch("/channel/updateProfileImage",upload.single("profileImage"), updateChannelProfileImage);
router.patch("/channel/updateCoverImage", upload.single("coverImage") ,updateChannelCoverImage);

// Delete Methods
router.delete("/channel/deleteChannel", deleteChannel);

// Get Methods
router.get("/channel/getChannel", getChannel);

module.exports = router;