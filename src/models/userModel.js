const connection = require('./connection');

const createUser = async (user) => {
  const db = await connection();
  const result = await db.collection('users').insertOne(user);
  return { insertedId: result.insertedId, user };
};

module.exports = {
  createUser,
};
