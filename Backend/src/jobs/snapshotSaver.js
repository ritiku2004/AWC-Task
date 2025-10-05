const { worker } = require('../workers/queue');
const whiteboardService = require('../services/whiteboard.service');
const logger = require('../config/logger');

worker.on('completed', (job) => {
  logger.info(`Job ${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
  logger.error(`Job ${job.id} has failed with ${err.message}`);
});

const processSnapshotJob = () => {
  worker.process('save-snapshot', async (job) => {
    const { roomId, snapshotData } = job.data;
    await whiteboardService.saveSnapshot(roomId, snapshotData);
  });
};

module.exports = {
  processSnapshotJob,
};