const connection = require('./connection');

const createUser = async (user) => {
  const db = await connection();
  const result = await db.collection('users').insertOne({ ...user, role: 'user' });
  return { ID: result.insertedId, user, role: 'user' };
};

module.exports = {
  createUser,
};
