const moment = require('moment');
const connection = require('./connection');

const createTask = async (task, userId) => {
  const db = await connection();
  const createdAt = moment().format('HH:mm - DD-MM-yyyy');
  const result = await db.collection('tasks').insertOne({
    ...task, userId, createdAt,
  });
  return {
    _id: result.insertedId, task, userId, createdAt,
  };
};

const getlAllTasks = async () => {
  console.log('model');
  const db = await connection();
  const tasks = await db.collection('tasks').find().toArray();
  return tasks;
};

module.exports = {
  createTask,
  getlAllTasks,
};
