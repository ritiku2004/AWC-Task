const userRepository = require('../repositories/user.repository');
const ApiError = require('../utils/ApiError');

const registerUser = async (username, password) => {
  if (await userRepository.findUserByUsername(username)) {
    throw new ApiError(409, 'Username already exists');
  }
  return userRepository.createUser({ username, password });
};

const loginUser = async (username, password) => {
  const user = await userRepository.findUserByUsername(username);
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid username or password');
  }
  return user;
};

// New function
const getUserById = async (userId) => {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};

module.exports = {
  registerUser,
  loginUser,
  getUserById, // Export it
};