const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  headline: {
    type: String,
    required: true
  },
  email: {
     type: String,
     required: true
  },
  skills: [{
      type: String
  }],
  summary: {
      type: String
  },
  avatarUrl: {
      type: String
  }
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      delete ret.__v;
    }
  }
});

// Text Index for Search
applicantSchema.index({ name: 'text', headline: 'text', skills: 'text', summary: 'text' });

const Applicant = mongoose.model('Applicant', applicantSchema);

module.exports = Applicant;
