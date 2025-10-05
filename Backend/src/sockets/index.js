const { Server } = require('socket.io');
const config = require('../config');
const logger = require('../config/logger');
const registerRoomHandlers = require('./roomSocket');
const registerChatHandlers = require('./chatSocket');
const registerWhiteboardHandlers = require('./whiteboardSocket');

const rooms = {};

const initializeSocketIO = (server) => {
  const io = new Server(server, {
    cors: {
      origin: config.corsOrigin,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    logger.info(`New client connected: ${socket.id}`);

    registerRoomHandlers(io, socket, rooms);
    registerChatHandlers(io, socket);
    registerWhiteboardHandlers(io, socket);

    socket.on('disconnect', (reason) => {
      logger.info(`Client disconnected: ${socket.id}, Reason: ${reason}`);
      const { roomId } = socket.data;
      if (roomId && rooms[roomId]) {
        rooms[roomId] = rooms[roomId].filter(p => p.id !== socket.id);
        io.to(roomId).emit('room:participants', rooms[roomId]);
        socket.to(roomId).emit('user:left', { userId: socket.id });
      }
    });
  });

  return io;
};

module.exports = initializeSocketIO;