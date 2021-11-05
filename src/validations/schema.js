const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'string.empty': 'Name must not be empty',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email must not be empty',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password must not be empty',
    'any.required': 'Password is required',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email must not be empty',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password must not be empty',
    'any.required': 'Password is required',
  }),
});

const taskSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Title must not be empty',
    'any.required': 'Title is required',
  }),
  content: Joi.string().required().messages({
    'string.empty': 'Content must not be empty',
    'any.required': 'Content is required',
  }),
});

module.exports = { userSchema, loginSchema, taskSchema };
