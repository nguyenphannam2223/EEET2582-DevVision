const express = require('express');
const { searchApplicants, getApplicant } = require('../controllers/search.controller');

const router = express.Router();

router.get('/applicants', searchApplicants);
router.get('/applicants/:id', getApplicant);

module.exports = router;
