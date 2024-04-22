const express = require("express");
const authMiddleware = require("../../middleware/auth");
const { search } = require("../../controllers/search/search.controller");

const router = express.Router();

router.use(authMiddleware);

router.get("/search/",search);

module.exports = router;