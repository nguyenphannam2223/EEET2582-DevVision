const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

const companyProfileSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
     type: String,
     required: true
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String
  },
  address: {
      type: String
  },
  phoneNumber: {
      type: String
  },
  logoUrl: {
      type: String
  },
  description: {
      type: String
  },
  whoWeAreLookingFor: {
      type: String
  },
  images: [{
      type: String
  }]
}, {
  timestamps: true
});

const CompanyProfile = mongoose.model('CompanyProfile', companyProfileSchema);

async function seedCompanies(mongoUri, users) {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to Company DB');

    // Clear existing companies (optional)
    await CompanyProfile.deleteMany({});
    console.log('Cleared existing company profiles');

    const companies = [];

    // Create a company profile for each user
    for (const user of users) {
      const company = {
        companyId: new mongoose.Types.ObjectId(user.id),
        name: faker.company.name(),
        email: user.email,
        country: faker.location.country(),
        city: faker.location.city(),
        address: faker.location.streetAddress(),
        phoneNumber: faker.phone.number(),
        logoUrl: faker.image.urlLoremFlickr({ category: 'business' }),
        description: faker.company.catchPhrase() + '. ' + faker.lorem.paragraph(),
        whoWeAreLookingFor: faker.lorem.sentences(2),
        images: [
          faker.image.urlLoremFlickr({ category: 'office' }),
          faker.image.urlLoremFlickr({ category: 'work' })
        ]
      };
      companies.push(company);
    }

    const createdCompanies = await CompanyProfile.insertMany(companies);
    console.log(`✓ Created ${createdCompanies.length} company profiles`);

    return createdCompanies;

  } catch (error) {
    console.error('Error seeding companies:', error);
    throw error;
  }
}

module.exports = seedCompanies;
