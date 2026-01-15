const { BaseRepository } = require('@devvision/common');
const Job = require('../models/job.model');

class JobRepository extends BaseRepository {
  constructor() {
    super(Job);
  }

  async findByCompanyId(companyId) {
    return await this.model.find({ companyId }).sort({ createdAt: -1 });
  }
}

module.exports = new JobRepository();
