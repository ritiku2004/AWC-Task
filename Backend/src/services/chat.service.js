const messageRepository = require('../repositories/message.repository');
const roomRepository = require('../repositories/room.repository');
const ApiError = require('../utils/ApiError');

const persistMessage = async ({ text, userId, username, roomId }) => {
  const room = await roomRepository.findRoomByRoomId(roomId);
  if (!room) {
    throw new ApiError(404, 'Room not found');
  }
  const messageData = {
    text,
    user: userId,
    username,
    room: room._id,
  };
  return messageRepository.saveMessage(messageData);
};

const getMessagesForRoom = async (roomId) => {
  const room = await roomRepository.findRoomByRoomId(roomId);
  if (!room) {
    throw new ApiError(404, 'Room not found');
  }
  return messageRepository.findMessagesByRoomId(room._id);
};

module.exports = {
  persistMessage,
  getMessagesForRoom,
};