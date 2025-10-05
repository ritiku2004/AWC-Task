const User = require('../models/user.model');

const findUserByUsername = (username) => {
  return User.findOne({ username }).exec();
};

const createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

const findUserById = (id) => {
  return User.findById(id).exec();
};

module.exports = {
  findUserByUsername,
  createUser,
  findUserById,
};