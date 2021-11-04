const { Router } = require('express');
const { createTask, getAllTasks } = require('../../controllers/tasksController');
const Auth = require('../../middlewares/Auth');

const router = Router();

router.post('/', Auth, createTask);
router.get('/', getAllTasks);

module.exports = router;
