const express = require('express');
const { register, login, refreshToken } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup', register);
router.post('/signin', login);
router.post('/refresh-token', refreshToken);

module.exports = router;
