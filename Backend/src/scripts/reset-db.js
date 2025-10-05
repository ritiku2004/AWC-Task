// Placeholder for a script to completely wipe the database.
const mongoose = require('mongoose');
const config = require('../config');
const logger = require('../config/logger');

const resetDB = async () => {
  try {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
    logger.info('MongoDB connected for reset.');

    await mongoose.connection.db.dropDatabase();
    logger.info('Database has been dropped successfully.');

  } catch (error) {
    logger.error('Error resetting database:', error);
  } finally {
    await mongoose.disconnect();
    logger.info('MongoDB disconnected.');
  }
};

resetDB();