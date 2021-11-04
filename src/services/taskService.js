const { createTask } = require('../models/tasksModel');

const createNewTask = async (task, id) => {
  const result = await createTask(task, id);
  return result;
};

module.exports = {
  createNewTask,
};
