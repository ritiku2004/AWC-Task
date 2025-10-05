const express = require('express');
const authController = require('../controllers/auth.controller');
const validate = require('../middlewares/validation.middleware');
const authValidator = require('../utils/validators/auth.validator');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/register', validate(authValidator.register), authController.register);
router.post('/login', validate(authValidator.login), authController.login);
router.post('/logout', authController.logout);

// This route will be protected. If the request has a valid cookie, it will succeed.
router.get('/status', authMiddleware, authController.checkStatus);

module.exports = router;