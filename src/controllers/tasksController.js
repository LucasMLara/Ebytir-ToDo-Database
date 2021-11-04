const { StatusCodes: { CREATED, INTERNAL_SERVER_ERROR, OK } } = require('http-status-codes');
const moment = require('moment');

const { createNewTask, getTasks } = require('../services/taskService');

const createTask = async (req, res, next) => {
  try {
    const { _id, name: createdBy } = req.user;
    const { title, content } = req.body;
    const createdAt = moment().format('HH:mm - DD-MM-yyyy');
    await createNewTask({ title, content }, _id);
    res.status(CREATED).json({
      NewTaskAdded: {
        title,
        content,
        createdBy,
        createdAt,
      },
    });
  } catch (e) {
    next({ statusCode: INTERNAL_SERVER_ERROR, message: e.message });
  }
};

const getAllTasks = async (_req, res, next) => {
  try {
    const tasks = await getTasks();
    res.status(OK).json(tasks);
  } catch (e) {
    next({ statusCode: INTERNAL_SERVER_ERROR, message: e.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
};
