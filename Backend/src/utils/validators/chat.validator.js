const Joi = require('joi');

const getMessages = {
  params: Joi.object().keys({
    roomId: Joi.string().guid({ version: 'uuidv4' }).required(),
  }),
};

module.exports = {
  getMessages,
};