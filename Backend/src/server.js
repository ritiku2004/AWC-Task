const http = require('http');
const { ExpressPeerServer } = require('peer'); // 1. Import ExpressPeerServer
const app = require('./app');
const config = require('./config');
const connectDB = require('./db/mongoose');
const logger = require('./config/logger');
const initializeSocketIO = require('./sockets');
const { startCronJobs } = require('./cron/cleanupOldRooms');

const server = http.createServer(app);

// 2. Create the Peer server and attach it to the Express app
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/myapp',
});
app.use('/peerjs', peerServer); // All peer traffic will go through /peerjs

// Initialize Socket.IO (this remains the same)
const io = initializeSocketIO(server);
app.set('io', io);

const startServer = async () => {
  try {
    await connectDB();
    server.listen(config.port, () => {
      logger.info(`Server listening on port ${config.port}`);
      logger.info(`PeerJS server running on /peerjs`); // Log the new server path
      if (config.env === 'production') {
        startCronJobs();
      }
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();