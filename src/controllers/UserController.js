const { StatusCodes: { CREATED, INTERNAL_SERVER_ERROR, OK } } = require('http-status-codes');

const userService = require('../services/userService');

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    await userService.createNewUser({ name, email, password });
    res.status(CREATED).json({ message: 'Novo Usuário Cadastrado' });
  } catch (e) {
    next({ statusCode: INTERNAL_SERVER_ERROR, message: e.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await userService.login({ email, password });
    res.status(OK).json(token);
  } catch (e) {
    next({ statusCode: INTERNAL_SERVER_ERROR, message: e.message });
  }
};

module.exports = {
  createUser,
  login,
};
