const chatService = require('../services/chat.service');
const { successResponse } = require('../utils/response');

const getRoomMessages = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const messages = await chatService.getMessagesForRoom(roomId);
    res.status(200).json(successResponse(messages));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRoomMessages,
};