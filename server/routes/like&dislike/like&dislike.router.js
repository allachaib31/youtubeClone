const express = require("express");
const { like, dislike } = require("../../controllers/like&dislike/like&dislike.controller.js");
const authMiddleware = require("../../middleware/auth.js");
const router = express.Router();

router.use(authMiddleware);

// Poste Methods
router.post("/like/", like);
router.post("/dislike/", dislike);

module.exports = router;