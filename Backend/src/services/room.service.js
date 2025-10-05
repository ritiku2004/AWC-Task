const { v4: uuidv4 } = require('uuid');
const roomRepository = require('../repositories/room.repository');
const ApiError = require('../utils/ApiError');

const createRoom = async (name, userId) => {
  const roomData = {
    name,
    roomId: uuidv4(),
    createdBy: userId,
    participants: [userId],
  };
  return roomRepository.createRoom(roomData);
};

const getRoomByRoomId = async (roomId) => {
  const room = await roomRepository.findRoomByRoomId(roomId);
  if (!room) {
    throw new ApiError(404, 'Room not found');
  }
  return room;
};

module.exports = {
  createRoom,
  getRoomByRoomId,
};