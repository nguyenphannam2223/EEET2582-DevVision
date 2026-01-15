const { BaseRepository } = require('@devvision/common');
const User = require('../models/user.model');

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    return await this.model.findOne({ email });
  }
}

module.exports = new UserRepository();
