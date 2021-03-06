const {
  StatusCodes: {
    CREATED, INTERNAL_SERVER_ERROR, OK, NO_CONTENT,
  },
} = require('http-status-codes');
const moment = require('moment');

const {
  createNewTask, getTasks, getSingleTask, updateSingleTask, remove,
} = require('../services/taskService');

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

const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await getSingleTask(id);
    res.status(OK).json(task);
  } catch (e) {
    next({ statusCode: INTERNAL_SERVER_ERROR, message: e.message });
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { params: { id }, body: { ...task } } = req;
    const taskUpdated = await updateSingleTask(id, task);
    res.status(OK).json(taskUpdated);
  } catch (e) {
    next({ statusCode: INTERNAL_SERVER_ERROR, message: e.message });
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await remove(id);
    res.status(NO_CONTENT).json();
  } catch (e) {
    next({ statusCode: INTERNAL_SERVER_ERROR, message: e.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
