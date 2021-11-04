const moment = require('moment');
const { ObjectId } = require('mongodb');
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
  const db = await connection();
  const tasks = await db.collection('tasks').find().toArray();
  return tasks;
};

const getTask = async (id) => {
  const db = await connection();
  const task = await db.collection('tasks').findOne(new ObjectId(id));
  return task;
};

const updateTask = async (id, task) => {
  const db = await connection();
  await db.collection('tasks').updateOne(
    { _id: ObjectId(id) },
    { $set: { ...task } },
  );
  const taskUpdated = await db.collection('tasks').findOne(new ObjectId(id));
  return taskUpdated;
};

module.exports = {
  createTask,
  getlAllTasks,
  getTask,
  updateTask,
};
