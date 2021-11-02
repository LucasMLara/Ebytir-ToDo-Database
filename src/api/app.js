const express = require('express');
const bodyParser = require('body-parser');
const { StatusCodes: { OK } } = require('http-status-codes');
const userRouter = require('./routes/usersRouter');
const error = require('../middlewares/error');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', userRouter);
app.get('/ping', (req, res) => {
  res.status(OK).json({ message: 'Pong' });
});

app.use(error);

module.exports = app;
