const { createTask, getlAllTasks } = require('../models/tasksModel');

const createNewTask = async (task, id) => {
  const result = await createTask(task, id);
  return result;
};

const getTasks = async () => {
  const result = await getlAllTasks();
  return result;
};

module.exports = {
  createNewTask,
  getTasks,
};
