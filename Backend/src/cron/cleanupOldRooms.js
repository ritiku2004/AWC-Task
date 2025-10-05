const cron = require('node-cron');
const Room = require('../models/room.model');
const logger = require('../config/logger');

const cleanupJob = async () => {
  logger.info('CRON: Starting cleanup of old, inactive rooms...');
  try {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const result = await Room.deleteMany({
      updatedAt: { $lt: oneWeekAgo },
      participants: { $size: 0 },
    });
    if (result.deletedCount > 0) {
      logger.info(`CRON: Cleanup complete. ${result.deletedCount} old rooms deleted.`);
    } else {
      logger.info(`CRON: Cleanup complete. No old rooms to delete.`);
    }
  } catch (error) {
    logger.error('CRON: Error during old rooms cleanup job:', error);
  }
};

const startCronJobs = () => {
  // Schedule to run every day at 2 AM
  cron.schedule('0 2 * * *', cleanupJob);
  logger.info('Cron job for room cleanup scheduled.');
};

module.exports = { startCronJobs };