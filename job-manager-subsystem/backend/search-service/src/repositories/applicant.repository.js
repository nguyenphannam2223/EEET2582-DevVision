const { BaseRepository } = require('@devvision/common');
const Applicant = require('../models/applicant.model');

class ApplicantRepository extends BaseRepository {
  constructor() {
    super(Applicant);
  }

  async search(q) {
    let query = {};
    if (q) {
        query = { $text: { $search: q } };
    }

    let sort = { createdAt: -1 };
    let projection = {};
    if (q) {
        projection = { score: { $meta: "textScore" } };
        sort = { score: { $meta: "textScore" } };
    }

    return await this.model.find(query, projection).sort(sort);
  }
}

module.exports = new ApplicantRepository();
