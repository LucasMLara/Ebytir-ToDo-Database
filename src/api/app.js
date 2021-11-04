const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/usersRouter');
const loginRouter = require('./routes/loginRouter');
const error = require('../middlewares/error');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/login', loginRouter);

app.use(error);

module.exports = app;
