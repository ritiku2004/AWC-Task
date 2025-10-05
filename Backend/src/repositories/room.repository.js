const Room = require('../models/room.model');

const createRoom = (roomData) => {
  const room = new Room(roomData);
  return room.save();
};

const findRoomByRoomId = (roomId) => {
  return Room.findOne({ roomId }).exec();
};

const addUserToRoom = (roomId, userId) => {
  return Room.findOneAndUpdate(
    { roomId },
    { $addToSet: { participants: userId } },
    { new: true }
  ).exec();
};

const removeUserFromRoom = (roomId, userId) => {
  return Room.findOneAndUpdate(
    { roomId },
    { $pull: { participants: userId } },
    { new: true }
  ).exec();
};


module.exports = {
  createRoom,
  findRoomByRoomId,
  addUserToRoom,
  removeUserFromRoom,
};