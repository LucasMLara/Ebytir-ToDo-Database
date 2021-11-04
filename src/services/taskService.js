const {
  createTask, getlAllTasks, getTask, updateTask, removeTask,
} = require('../models/tasksModel');

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

const updateSingleTask = async (id, task) => {
  const result = await updateTask(id, task);
  return result;
};

const remove = async (id) => {
  await removeTask(id);
};

module.exports = {
  createNewTask,
  getTasks,
  getSingleTask,
  updateSingleTask,
  remove,
};
