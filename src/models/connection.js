const { MongoClient } = require('mongodb');
require('dotenv').config();

const { TODO_LIST_URL } = process.env;

const DATABASE = 'ToDoList_Ebytir';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

module.exports = () => (
  db ? Promise.resolve(db) : MongoClient.connect(TODO_LIST_URL, OPTIONS).then((conn) => {
    db = conn.db(DATABASE);
    return db;
  })
);
