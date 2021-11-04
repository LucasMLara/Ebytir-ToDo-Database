const { Router } = require('express');
const { createTask, getAllTasks, getTaskById } = require('../../controllers/tasksController');
const Auth = require('../../middlewares/Auth');

const router = Router();

router.post('/', Auth, createTask);
router.get('/', Auth, getAllTasks);
router.get('/:id', Auth, getTaskById);

module.exports = router;
