const express = require('express');
const { createJob, getCompanyJobs, getJob } = require('../controllers/job.controller');
const { applyToJob, getJobApplications, getApplicationDetails, updateApplicationStatus } = require('../controllers/application.controller');

const router = express.Router();

// Job Routes
router.post('/jobs', createJob);
router.get('/jobs/company/:companyId', getCompanyJobs);
router.get('/jobs/:id', getJob);

// Application Routes
router.post('/applications', applyToJob); // Mock
router.get('/applications/job/:jobId', getJobApplications);
router.get('/applications/:id', getApplicationDetails);
router.put('/applications/:id/status', updateApplicationStatus);

module.exports = router;
