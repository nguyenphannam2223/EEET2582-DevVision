const { BaseRepository } = require('@devvision/common');
const CompanyProfile = require('../models/profile.model');

class ProfileRepository extends BaseRepository {
  constructor() {
    super(CompanyProfile);
  }

  async findByCompanyId(companyId) {
    return await this.model.findOne({ companyId });
  }

  async updateByCompanyId(companyId, data) {
    return await this.model.findOneAndUpdate(
      { companyId },
      { $set: data },
      { new: true, runValidators: true }
    );
  }
}

module.exports = new ProfileRepository();
