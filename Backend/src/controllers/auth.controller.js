const authService = require('../services/auth.service');
const { generateToken } = require('../utils/jwt');
const { successResponse } = require('../utils/response');
const config = require('../config');

// Login controller updated to set a cookie
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await authService.loginUser(username, password);
    const token = generateToken(user._id);

    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      secure: config.env === 'production', // Only send over HTTPS in production
      sameSite: 'strict',
    };

    res.cookie('jwt', token, cookieOptions);

    res.status(200).json(successResponse({ user: user.toJSON() }, 'Login successful'));
  } catch (error) {
    next(error);
  }
};

// New controller for checking session status
const checkStatus = async (req, res, next) => {
  try {
    // The authMiddleware will have already verified the user if the cookie is valid
    // req.user is attached by the middleware
    const user = await authService.getUserById(req.user.sub);
    res.status(200).json(successResponse({ user: user.toJSON() }));
  } catch (error) {
    // This will catch cases where the user doesn't exist anymore but token is still there
    next(error);
  }
};

// New controller for logging out
const logout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json(successResponse(null, 'Logout successful'));
};

// Register remains the same
const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await authService.registerUser(username, password);
    res.status(201).json(successResponse(user, 'User registered successfully'));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  checkStatus,
};