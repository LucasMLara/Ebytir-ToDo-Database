const { StatusCodes: { UNAUTHORIZED } } = require('http-status-codes');
const { verify } = require('jsonwebtoken');

require('dotenv').config();

const { SECRET } = process.env;

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) next({ message: 'User Not Authenticated', statusCode: UNAUTHORIZED });
    const authenticatedUser = verify(authorization, SECRET);
    req.user = authenticatedUser;
    next();
  } catch (e) {
    next({ message: 'Unauthorized User', statusCode: UNAUTHORIZED });
  }
};
