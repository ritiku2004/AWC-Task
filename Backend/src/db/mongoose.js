const mongoose = require('mongoose');
const config = require('../config');
const logger = require('../config/logger');

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
    logger.info('Successfully connected to MongoDB.');
  } catch (error) {
    logger.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;