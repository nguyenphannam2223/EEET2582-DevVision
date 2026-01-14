require('dotenv').config();
const mongoose = require('mongoose');

const seedUsers = require('./seed-users');
const seedCompanies = require('./seed-companies');
const seedApplicants = require('./seed-applicants');
const seedJobs = require('./seed-jobs');
const seedApplications = require('./seed-applications');

async function main() {
  try {
    console.log("Starting database seeding...\n");

    // Validate environment variables
    if (!process.env.MONGO_URI_AUTH || !process.env.MONGO_URI_COMPANY || 
        !process.env.MONGO_URI_JOB || !process.env.MONGO_URI_SEARCH) {
      throw new Error('Missing MongoDB URIs in .env file. Please check .env.example');
    }

    // Step 1: Seed Users
    console.log("Step 1: Seeding users...");
    const users = await seedUsers(process.env.MONGO_URI_AUTH);
    await mongoose.disconnect();
    console.log('');

    // Step 2: Seed Companies
    console.log("Step 2: Seeding company profiles...");
    await seedCompanies(process.env.MONGO_URI_COMPANY, users);
    await mongoose.disconnect();
    console.log('');

    // Step 3: Seed Applicants
    console.log("Step 3: Seeding applicants...");
    const applicants = await seedApplicants(process.env.MONGO_URI_SEARCH);
    await mongoose.disconnect();
    console.log('');

    // Step 4: Seed Jobs
    console.log("Step 4: Seeding jobs...");
    const jobs = await seedJobs(process.env.MONGO_URI_JOB, users);
    await mongoose.disconnect();
    console.log('');

    // Step 5: Seed Applications
    console.log("Step 5: Seeding applications...");
    await seedApplications(process.env.MONGO_URI_JOB, jobs, applicants);
    await mongoose.disconnect();
    console.log('');

    console.log("Database seeding completed successfully!\n");
    console.log("Summary:");
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Company Profiles: ${users.length}`);
    console.log(`   - Applicants: ${applicants.length}`);
    console.log(`   - Jobs: ${jobs.length}`);
    console.log(`   - Total applications created`);
    console.log('\nTest credentials:');
    console.log('   Email: Use any email from seeded users');
    console.log('   Password: Test@123');
    console.log('\nNext steps:');
    console.log('   1. Start your services: docker compose up');
    console.log('   2. Start frontend: cd frontend && npm run dev');
    console.log('   3. Login with any seeded user email and password: Test@123');

    process.exit(0);
  } catch (error) {
    console.error('\nSeeding failed:', error);
    process.exit(1);
  }
}

main();
