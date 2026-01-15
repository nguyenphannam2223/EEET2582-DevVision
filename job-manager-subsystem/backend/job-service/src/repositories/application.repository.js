const { BaseRepository } = require('@devvision/common');
const Application = require('../models/application.model');

class ApplicationRepository extends BaseRepository {
  constructor() {
    super(Application);
  }

  async findByJobId(jobId) {
    return await this.model.find({ jobId }).sort({ createdAt: -1 });
  }
}

module.exports = new ApplicationRepository();
