const express = require('express');
const chatController = require('../controllers/chat.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const chatValidator = require('../utils/validators/chat.validator');

const router = express.Router();

router.get('/:roomId', authMiddleware, validate(chatValidator.getMessages), chatController.getRoomMessages);

module.exports = router;