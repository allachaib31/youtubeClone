const express = require("express");
const authMiddleware = require("../../middleware/auth");
const {
  addComment,
  removeComment,
  getComments,
} = require("../../controllers/comment/comment.controller");
const router = express.Router();

router.use(authMiddleware);

// Post Methods
router.post("/comment/addComment", addComment);

// Delete Methods
router.delete("/comment/removeComment", removeComment);

// Get Methods
router.get("/comment/getComments", getComments);

module.exports = router;
