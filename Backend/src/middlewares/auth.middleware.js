const jwt = require('jsonwebtoken');
const config = require('../config');
const ApiError = require('../utils/ApiError');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt; // Read token from cookie

  if (!token) {
    return next(new ApiError(401, 'Unauthorized: No token provided'));
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded; // Attaches payload { sub: userId, iat, exp }
    next();
  } catch (error) {
    return next(new ApiError(401, 'Unauthorized: Invalid token'));
  }
};

module.exports = authMiddleware;