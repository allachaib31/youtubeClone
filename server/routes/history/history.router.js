const express = require("express");
const authMiddleware = require("../../middleware/auth");
const { addHistory, getHistory } = require("../../controllers/history/history.controllers");
const router = express.Router();

router.use(authMiddleware);


// Get Methods
router.get("/history/", getHistory);

module.exports = router;