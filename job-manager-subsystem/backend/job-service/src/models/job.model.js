const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  companyId: {
    type: String, // from Auth/Company Service
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: true
  },
  salaryRange: {
      type: String
  },
  skills: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['open', 'closed', 'archived'],
    default: 'open'
  }
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      delete ret.__v;
    }
  }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
