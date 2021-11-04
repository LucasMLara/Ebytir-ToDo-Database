const { sign } = require('jsonwebtoken');
const { createUser, findOnebyEmail } = require('../models/userModel');

require('dotenv').config();

const { SECRET, EXPIRE_TIME, ALTORITHM_TYPE } = process.env;

const jwtConfig = {
  expiresIn: EXPIRE_TIME,
  algorithm: ALTORITHM_TYPE,
};

const createNewUser = async (user) => {
  const result = await createUser(user);
  return result;
};

const login = async (data) => {
  const user = await findOnebyEmail(data.email);
  const { email, _id, name } = user;
  const token = sign({ email, _id, name }, SECRET, jwtConfig);
  return { token };
};

module.exports = {
  createNewUser,
  login,
};
