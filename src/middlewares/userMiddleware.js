const {
  StatusCodes: { BAD_REQUEST },
} = require('http-status-codes');
const Schema = require('../validations/schema');

const checkNewUserEntries = async (req, _res, next) => {
  const { name, email, password } = req.body;
  const { error } = Schema.userSchema.validate({ name, email, password });
  if (error) next({ message: 'Algum dos campos está faltoso ou inválido', statusCode: BAD_REQUEST });
  next();
};

module.exports = { checkNewUserEntries };
