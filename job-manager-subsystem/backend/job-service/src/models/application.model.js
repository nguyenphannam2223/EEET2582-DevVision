const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  applicantId: {
     type: String, // Mock ID or from future Applicant Service
     required: true
  },
  applicantName: {
      type: String,
      required: true
  },
  applicantEmail: {
      type: String,
      required: true
  },
  resumeUrl: {
      type: String,
      required: true
  },
  coverLetter: {
      type: String
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'archived'],
    default: 'pending'
  }
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      delete ret.__v;
    }
  }
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
