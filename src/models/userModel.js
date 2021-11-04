const connection = require('./connection');

const createUser = async (user) => {
  const db = await connection();
  const result = await db.collection('users').insertOne({ ...user, role: 'user' });
  return { ID: result.insertedId, user, role: 'user' };
};

const findOnebyEmail = async (email) => {
  const db = await connection();
  const result = await db.collection('users').findOne({ email });
  return result;
};

module.exports = {
  createUser,
  findOnebyEmail,
};
