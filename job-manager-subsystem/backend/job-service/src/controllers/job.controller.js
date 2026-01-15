const jobRepository = require("../repositories/job.repository");
const { BadRequestError } = require("@devvision/common");

const createJob = async (req, res, next) => {
  try {
    const { title, description, requirements, salaryRange, skills, companyId } =
      req.body;

    if (!title || !description || !companyId) {
      throw new BadRequestError(
        "Title, description, and companyId are required"
      );
    }

    const job = await jobRepository.create({
      companyId,
      title,
      description,
      requirements,
      salaryRange,
      skills: Array.isArray(skills) ? skills : [],
    });

    res.status(201).send(job);
  } catch (err) {
    next(err);
  }
};

const getCompanyJobs = async (req, res, next) => {
  try {
    const { companyId } = req.params;
    const jobs = await jobRepository.findByCompanyId(companyId);
    res.status(200).send(jobs);
  } catch (err) {
    next(err);
  }
};

const getJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await jobRepository.findById(id);
    if (!job) {
      throw new BadRequestError("Job not found");
    }
    res.status(200).send(job);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createJob,
  getCompanyJobs,
  getJob,
};
