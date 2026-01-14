const express = require('express');
const {
  createProfileInternal,
  getProfile,
  updateProfile,
  uploadLogo,
} = require("../controllers/profile.controller");
const upload = require("../middlewares/upload.middleware");

const router = express.Router();

router.post('/internal/profiles', createProfileInternal);
router.get('/:id', getProfile);
router.put("/:id", updateProfile);
router.post("/:id/logo", upload.single("logo"), uploadLogo);

module.exports = router;
