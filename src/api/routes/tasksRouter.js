const { Router } = require('express');
const { createTask } = require('../../controllers/tasksController');
const Auth = require('../../middlewares/Auth');

const router = Router();

router.post('/', Auth, createTask);

module.exports = router;
