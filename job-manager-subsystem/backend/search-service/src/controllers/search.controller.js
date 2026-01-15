const applicantRepository = require("../repositories/applicant.repository");
const { BadRequestError } = require("@devvision/common");

const searchApplicants = async (req, res, next) => {
  try {
    const { q } = req.query;
    const applicants = await applicantRepository.search(q);
    res.status(200).send(applicants);
  } catch (err) {
    next(err);
  }
};

const getApplicant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const applicant = await applicantRepository.findById(id);
    if (!applicant) {
      throw new BadRequestError("Applicant not found");
    }
    res.status(200).send(applicant);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  searchApplicants,
  getApplicant,
};
