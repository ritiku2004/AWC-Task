// Placeholder for a script to seed the database with initial data, e.g., an admin user.
const mongoose = require('mongoose');
const config = require('../config');
const User = require('../models/user.model');
const logger = require('../config/logger');

const seedDB = async () => {
  try {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
    logger.info('MongoDB connected for seeding.');

    await User.deleteMany({});
    logger.info('Cleared existing users.');

    const adminUser = new User({
      username: 'admin',
      password: 'password123',
    });
    await adminUser.save();
    logger.info('Admin user seeded.');

  } catch (error) {
    logger.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    logger.info('MongoDB disconnected.');
  }
};

seedDB();