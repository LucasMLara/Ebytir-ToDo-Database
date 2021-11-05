const {
  StatusCodes: { BAD_REQUEST, UNAUTHORIZED },
} = require('http-status-codes');
const Schema = require('../validations/schema');
const { findOnebyEmail } = require('../models/userModel');

const checkNewUserEntries = async (req, _res, next) => {
  const { name, email, password } = req.body;
  const { error } = Schema.userSchema.validate({ name, email, password });
  if (error) next({ message: 'Algum dos campos está faltoso ou inválido', statusCode: BAD_REQUEST });
  next();
};

const checkLogin = async (req, _res, next) => {
  const { email, password } = req.body;
  const { error } = Schema.loginSchema.validate({ email, password });
  if (error) next({ message: error.message, statusCode: BAD_REQUEST });
  const userExists = await findOnebyEmail(email);
  if (!userExists || userExists.password !== password) {
    next({ message: 'Incorrect username or password', statusCode: UNAUTHORIZED });
  }
  next();
};

module.exports = { checkNewUserEntries, checkLogin };
