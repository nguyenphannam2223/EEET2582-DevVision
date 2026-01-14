# Database Seeding Scripts

This directory contains scripts to populate the DevVision Job Manager databases with test data.

## Prerequisites

- MongoDB Atlas connection strings configured in `.env` file
- Node.js installed

## Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your MongoDB Atlas connection strings (already configured if using docker-compose defaults)

3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

Run the seed script to populate all databases:

```bash
npm run seed
```

This will:
1. Create 10 company user accounts in `auth-db`
2. Create corresponding company profiles in `company-db`
3. Create 100 applicant profiles in `search-db`
4. Create 30-50 job postings in `job-db`
5. Create 150-300 job applications in `job-db`

## Test Credentials

After seeding, you can log in with any of the created user emails using:
- **Password**: `Test@123`

Check the console output after running the seed script to see the list of created user emails.

## Seed Files

- `seed-users.js` - Creates company user accounts
- `seed-companies.js` - Creates company profiles
- `seed-applicants.js` - Creates applicant profiles with searchable skills
- `seed-jobs.js` - Creates job postings
- `seed-applications.js` - Creates job applications
- `index.js` - Main orchestration script

## Notes

- Running the seed script will **clear existing data** in all collections
- The script uses faker.js to generate realistic test data
- Skills and job titles are based on common tech industry terms for better searchability
