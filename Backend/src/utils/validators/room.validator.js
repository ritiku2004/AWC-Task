const Joi = require('joi');

const createRoom = {
  body: Joi.object().keys({
    name: Joi.string().required().min(3).max(50),
  }),
};

const getRoom = {
  params: Joi.object().keys({
    roomId: Joi.string().guid({ version: 'uuidv4' }).required(),
  }),
};

module.exports = {
  createRoom,
  getRoom,
};