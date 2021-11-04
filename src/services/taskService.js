const { createTask, getlAllTasks, getTask } = require('../models/tasksModel');

const createNewTask = async (task, id) => {
  const result = await createTask(task, id);
  return result;
};

const getTasks = async () => {
  const result = await getlAllTasks();
  return result;
};

const getSingleTask = async (id) => {
  const result = await getTask(id);
  return result;
};

module.exports = {
  createNewTask,
  getTasks,
  getSingleTask,
};
