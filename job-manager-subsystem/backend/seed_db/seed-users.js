const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['company', 'admin'],
    default: 'company'
  }
});

const User = mongoose.model('User', userSchema);

async function seedUsers(mongoUri) {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to Auth DB');

    // Clear existing users (optional - remove if you want to keep existing data)
    await User.deleteMany({});
    console.log('Cleared existing users');

    const users = [];
    const plainPassword = 'Test@123'; // Standard password for all test users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    // Create 10 company users
    for (let i = 0; i < 10; i++) {
      const user = {
        email: faker.internet.email().toLowerCase(),
        password: hashedPassword,
        role: 'company'
      };
      users.push(user);
    }

    // Insert users
    const createdUsers = await User.insertMany(users);
    console.log(`✓ Created ${createdUsers.length} users`);
    console.log(`  Test password: ${plainPassword}`);

    // Return user IDs and emails for other seed scripts
    return createdUsers.map(u => ({
      id: u._id.toString(),
      email: u.email
    }));

  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

module.exports = seedUsers;
