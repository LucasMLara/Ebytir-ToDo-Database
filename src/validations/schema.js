const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = { userSchema };
