const { StatusCodes: { CREATED, INTERNAL_SERVER_ERROR } } = require('http-status-codes');
const moment = require('moment');

const { createNewTask } = require('../services/taskService');

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

module.exports = {
  createTask,
};
