const { Queue, Worker } = require('bullmq');
const config = require('../config');

const connection = {
  host: config.redis.host,
  port: config.redis.port,
};

const jobQueue = new Queue('background-jobs', { connection });

const worker = new Worker('background-jobs', async job => {
  // This worker is a generic placeholder.
  // Specific job processors will be defined in the jobs/ directory.
}, { connection });


const addJobToQueue = (name, data) => {
  jobQueue.add(name, data, {
    removeOnComplete: true, // Automatically remove job after completion
    removeOnFail: 500, // Keep up to 500 failed jobs
  });
};

module.exports = {
  addJobToQueue,
  jobQueue,
  worker,
};