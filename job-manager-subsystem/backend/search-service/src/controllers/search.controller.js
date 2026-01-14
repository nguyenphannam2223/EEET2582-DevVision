const Applicant = require('../models/applicant.model');
const { BadRequestError } = require('@devvision/common');

const searchApplicants = async (req, res, next) => {
  try {
    const { q } = req.query;

    let query = {};
    if (q) {
        query = { $text: { $search: q } };
    }

    // Sort by relevance score if searching, otherwise by latest
    let sort = { createdAt: -1 };
    let projection = {};
    if (q) {
        projection = { score: { $meta: "textScore" } };
        sort = { score: { $meta: "textScore" } };
    }

    const applicants = await Applicant.find(query, projection).sort(sort);
    res.status(200).send(applicants);
  } catch (err) {
    next(err);
  }
};

const getApplicant = async (req, res, next) => {
    try {
        const { id } = req.params;
        const applicant = await Applicant.findById(id);
        if (!applicant) {
            throw new BadRequestError('Applicant not found');
        }
        res.status(200).send(applicant);
    } catch(err) {
        next(err);
    }
}

module.exports = {
  searchApplicants,
  getApplicant
};
