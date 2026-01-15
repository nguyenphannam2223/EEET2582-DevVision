const express = require('express');
const {
  createProfileInternal,
  getProfile,
  updateProfile,
} = require("../controllers/profile.controller");

const router = express.Router();

router.post("/internal/profiles", createProfileInternal);
router.get("/:id", getProfile);
router.put("/:id", updateProfile);

module.exports = router;
