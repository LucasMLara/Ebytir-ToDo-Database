const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().required().min(5),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

module.exports = { userSchema };
