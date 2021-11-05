const {
  StatusCodes: { BAD_REQUEST, NOT_FOUND },
} = require('http-status-codes');
const Schema = require('../validations/schema');

const { getTask } = require('../models/tasksModel');

const checkTaskEntries = async (req, _res, next) => {
  console.log('ALO');
  const { title, content } = req.body;
  const { error } = Schema.taskSchema.validate({ title, content });
  if (error) next({ message: error.message, statusCode: BAD_REQUEST });
  next();
};

const checkIfPostsExists = async (req, _res, next) => {
  const { id } = req.params;
  const tasksExists = await getTask(id);
  if (!tasksExists) next({ message: 'Task not found', statusCode: NOT_FOUND });
  next();
};
module.exports = {
  checkTaskEntries,
  checkIfPostsExists,
};
