const { createUser } = require('../models/userModel');

const createNewUser = async (user) => {
  const result = await createUser(user);
  return result;
};

module.exports = {
  createNewUser,
};
