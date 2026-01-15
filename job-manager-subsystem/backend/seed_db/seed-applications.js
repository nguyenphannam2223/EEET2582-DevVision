const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

// Clear any cached models to prevent cross-database contamination
if (mongoose.models.Application) {
  delete mongoose.models.Application;
}

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  applicantId: {
     type: String,
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
  timestamps: true
});

const Application = mongoose.model('Application', applicationSchema);

async function seedApplications(mongoUri, jobs, applicants) {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to Job DB for applications');

    // Clear existing applications (optional)
    await Application.deleteMany({});
    console.log('Cleared existing applications');

    const applications = [];
    const statuses = ['pending', 'pending', 'pending', 'accepted', 'rejected']; // 3:1:1 ratio

    // Create 5-10 applications per open job
    const openJobs = jobs.filter(j => j.status === 'open');
    
    for (const job of openJobs) {
      const numApplications = faker.number.int({ min: 5, max: 10 });
      const selectedApplicants = faker.helpers.arrayElements(applicants, numApplications);
      
      for (const applicant of selectedApplicants) {
        const application = {
          jobId: new mongoose.Types.ObjectId(job.id),
          applicantId: applicant.id,
          applicantName: applicant.name,
          applicantEmail: applicant.email,
          resumeUrl: `https://example.com/resumes/${applicant.id}.pdf`,
          coverLetter: faker.helpers.maybe(() => faker.lorem.paragraphs(2), { probability: 0.7 }),
          status: faker.helpers.arrayElement(statuses)
        };
        applications.push(application);
      }
    }

    const createdApplications = await Application.insertMany(applications);
    console.log(`✓ Created ${createdApplications.length} applications`);

    return createdApplications;

  } catch (error) {
    console.error('Error seeding applications:', error);
    throw error;
  }
}

module.exports = seedApplications;
