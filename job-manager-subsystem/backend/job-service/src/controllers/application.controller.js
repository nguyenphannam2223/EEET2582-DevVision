const Application = require('../models/application.model');
const { BadRequestError } = require('@devvision/common');

// Mock apply for testing (since we don't have Applicant Service yet)
const applyToJob = async (req, res, next) => {
    try {
        const { jobId, applicantId, applicantName, applicantEmail, resumeUrl, coverLetter } = req.body;
        
        const application = new Application({
            jobId,
            applicantId,
            applicantName,
            applicantEmail,
            resumeUrl,
            coverLetter
        });
        
        await application.save();
        res.status(201).send(application);
    } catch(err) {
        next(err);
    }
}

const getJobApplications = async (req, res, next) => {
    try {
        const { jobId } = req.params;
        const applications = await Application.find({ jobId }).sort({ createdAt: -1 });
        res.status(200).send(applications);
    } catch(err) {
        next(err);
    }
}

const getApplicationDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        const application = await Application.findById(id);
        if (!application) {
            throw new BadRequestError('Application not found');
        }
        res.status(200).send(application);
    } catch(err) {
        next(err);
    }
}

const updateApplicationStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const application = await Application.findByIdAndUpdate(
            id, 
            { status }, 
            { new: true }
        );

        if (!application) {
            throw new BadRequestError('Application not found');
        }
        
        res.status(200).send(application);
    } catch(err) {
        next(err);
    }
}

module.exports = {
    applyToJob,
    getJobApplications,
    getApplicationDetails,
    updateApplicationStatus
};
