const applicationRepository = require("../repositories/application.repository");
const { BadRequestError } = require("@devvision/common");

// Mock apply for testing (since we don't have Applicant Service yet)
const applyToJob = async (req, res, next) => {
  try {
    const {
      jobId,
      applicantId,
      applicantName,
      applicantEmail,
      resumeUrl,
      coverLetter,
    } = req.body;

    const application = await applicationRepository.create({
      jobId,
      applicantId,
      applicantName,
      applicantEmail,
      resumeUrl,
      coverLetter,
    });

    res.status(201).send(application);
  } catch (err) {
    next(err);
  }
};

const getJobApplications = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const applications = await applicationRepository.findByJobId(jobId);
    res.status(200).send(applications);
  } catch (err) {
    next(err);
  }
};

const getApplicationDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const application = await applicationRepository.findById(id);
    if (!application) {
      throw new BadRequestError("Application not found");
    }
    res.status(200).send(application);
  } catch (err) {
    next(err);
  }
};

const updateApplicationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await applicationRepository.updateById(id, { status });

    if (!application) {
      throw new BadRequestError("Application not found");
    }

    res.status(200).send(application);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  applyToJob,
  getJobApplications,
  getApplicationDetails,
  updateApplicationStatus,
};
