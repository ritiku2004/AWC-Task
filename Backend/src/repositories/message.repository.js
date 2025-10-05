const Message = require('../models/message.model');

const saveMessage = (messageData) => {
  const message = new Message(messageData);
  return message.save();
};

const findMessagesByRoomId = (roomObjectId) => {
  return Message.find({ room: roomObjectId }).sort({ createdAt: 'asc' }).limit(100).exec();
};

module.exports = {
  saveMessage,
  findMessagesByRoomId,
};