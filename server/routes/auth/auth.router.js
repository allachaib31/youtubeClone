const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth.js");
const {
  login,
  signUp,
  logout,
  validateSession,
} = require("../../controllers/auth/auth.controllers.js");

// Post Methods
router.post("/auth/login", login);
router.post("/auth/signUp", signUp);
router.post("/auth/logout", logout);

router.use(authMiddleware);
router.post("/auth/validSession", validateSession);

module.exports = router;
