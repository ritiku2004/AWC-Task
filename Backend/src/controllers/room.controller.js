const roomService = require('../services/room.service');
const { successResponse } = require('../utils/response');

const createRoom = async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.user.sub;
    const room = await roomService.createRoom(name, userId);
    res.status(201).json(successResponse(room, 'Room created successfully'));
  } catch (error) {
    next(error);
  }
};

const getRoomDetails = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const room = await roomService.getRoomByRoomId(roomId);
    res.status(200).json(successResponse(room));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRoom,
  getRoomDetails,
};