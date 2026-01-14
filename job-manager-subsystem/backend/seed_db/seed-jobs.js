const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

const jobSchema = new mongoose.Schema({
  companyId: {
    type: String,
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
  timestamps: true
});

const Job = mongoose.model('Job', jobSchema);

const JOB_TITLES = [
  'Senior Software Engineer', 'Full Stack Developer', 'Backend Developer',
  'Frontend Developer', 'DevOps Engineer', 'Data Scientist',
  'Product Manager', 'Senior UI/UX Designer', 'QA Automation Engineer',
  'Mobile Developer (iOS/Android)', 'Cloud Solutions Architect',
  'Security Engineer', 'Machine Learning Engineer', 'Engineering Manager',
  'Site Reliability Engineer', 'Data Engineer', 'Solutions Architect'
];

const TECH_SKILLS = [
  'JavaScript', 'Python', 'Java', 'C++', 'React', 'Angular', 'Vue.js',
  'Node.js', 'Django', 'Spring Boot', 'Docker', 'Kubernetes', 'AWS',
  'Azure', 'GCP', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
  'GraphQL', 'REST API', 'TypeScript', 'Go', 'Rust'
];

async function seedJobs(mongoUri, users) {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to Job DB');

    // Clear existing jobs (optional)
    await Job.deleteMany({});
    console.log('Cleared existing jobs');

    const jobs = [];
    const statuses = ['open', 'open', 'open', 'open', 'closed', 'archived']; // 4:1:1 ratio

    // Create 3-5 jobs per company
    for (const user of users) {
      const numJobs = faker.number.int({ min: 3, max: 5 });
      
      for (let i = 0; i < numJobs; i++) {
        const numSkills = faker.number.int({ min: 3, max: 6 });
        const skills = faker.helpers.arrayElements(TECH_SKILLS, numSkills);
        
        const job = {
          companyId: user.id,
          title: faker.helpers.arrayElement(JOB_TITLES),
          description: faker.lorem.paragraphs(2),
          requirements: `• ${faker.lorem.sentence()}\n• ${faker.lorem.sentence()}\n• ${faker.lorem.sentence()}\n• ${faker.lorem.sentence()}`,
          salaryRange: `$${faker.number.int({ min: 60, max: 200 })}K - $${faker.number.int({ min: 80, max: 250 })}K`,
          skills: skills,
          status: faker.helpers.arrayElement(statuses)
        };
        jobs.push(job);
      }
    }

    const createdJobs = await Job.insertMany(jobs);
    console.log(`✓ Created ${createdJobs.length} jobs`);

    return createdJobs.map(j => ({
      id: j._id.toString(),
      companyId: j.companyId,
      title: j.title,
      status: j.status
    }));

  } catch (error) {
    console.error('Error seeding jobs:', error);
    throw error;
  }
}

module.exports = seedJobs;
