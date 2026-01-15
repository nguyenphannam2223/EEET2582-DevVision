const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

// Clear any cached models to prevent cross-database contamination
if (mongoose.models.Applicant) {
  delete mongoose.models.Applicant;
}

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
  timestamps: true
});

applicantSchema.index({ name: 'text', headline: 'text', skills: 'text', summary: 'text' });

const Applicant = mongoose.model('Applicant', applicantSchema);

const TECH_SKILLS = [
  'JavaScript', 'Python', 'Java', 'C++', 'React', 'Angular', 'Vue.js',
  'Node.js', 'Django', 'Spring Boot', 'Docker', 'Kubernetes', 'AWS',
  'Azure', 'GCP', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
  'GraphQL', 'REST API', 'TypeScript', 'Go', 'Rust', 'Swift',
  'Kotlin', 'Flutter', 'React Native', 'Jenkins', 'GitLab CI',
  'Terraform', 'Ansible', 'Machine Learning', 'TensorFlow', 'PyTorch'
];

const JOB_TITLES = [
  'Software Engineer', 'Full Stack Developer', 'Backend Developer',
  'Frontend Developer', 'DevOps Engineer', 'Data Scientist',
  'Product Manager', 'UI/UX Designer', 'QA Engineer', 'Mobile Developer',
  'Cloud Architect', 'Security Engineer', 'ML Engineer', 'Tech Lead'
];

async function seedApplicants(mongoUri) {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to Search DB');

    // Clear existing applicants (optional)
    await Applicant.deleteMany({});
    console.log('Cleared existing applicants');

    const applicants = [];

    // Create 100 applicants
    for (let i = 0; i < 100; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const name = `${firstName} ${lastName}`;
      
      // Random 3-8 skills per applicant
      const numSkills = faker.number.int({ min: 3, max: 8 });
      const skills = faker.helpers.arrayElements(TECH_SKILLS, numSkills);

      const applicant = {
        name: name,
        headline: faker.helpers.arrayElement(JOB_TITLES),
        email: faker.internet.email({ firstName, lastName }).toLowerCase(),
        skills: skills,
        summary: faker.lorem.sentences(3),
        avatarUrl: faker.image.avatar()
      };
      applicants.push(applicant);
    }

    const createdApplicants = await Applicant.insertMany(applicants);
    console.log(`✓ Created ${createdApplicants.length} applicants`);

    // Ensure text index is created
    await Applicant.collection.createIndex({ 
      name: 'text', 
      headline: 'text', 
      skills: 'text', 
      summary: 'text' 
    });
    console.log('✓ Text index created for search');

    return createdApplicants.map(a => ({
      id: a._id.toString(),
      name: a.name,
      email: a.email
    }));

  } catch (error) {
    console.error('Error seeding applicants:', error);
    throw error;
  }
}

module.exports = seedApplicants;
