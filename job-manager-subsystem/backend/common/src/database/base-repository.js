class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const document = new this.model(data);
    return await document.save();
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async findAll(filter = {}) {
    return await this.model.find(filter);
  }

  async updateById(id, data) {
    return await this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async deleteById(id) {
    return await this.model.findByIdAndDelete(id);
  }
}

module.exports = BaseRepository;
