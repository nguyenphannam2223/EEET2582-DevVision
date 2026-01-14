const express = require('express');
const { createProfileInternal, getProfile } = require('../controllers/profile.controller');

const router = express.Router();

router.post('/internal/profiles', createProfileInternal);
router.get('/:id', getProfile);

module.exports = router;
