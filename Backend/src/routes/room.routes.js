const express = require('express');
const roomController = require('../controllers/room.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const roomValidator = require('../utils/validators/room.validator');

const router = express.Router();

router.post('/create', authMiddleware, validate(roomValidator.createRoom), roomController.createRoom);
router.get('/:roomId', authMiddleware, validate(roomValidator.getRoom), roomController.getRoomDetails);

module.exports = router;