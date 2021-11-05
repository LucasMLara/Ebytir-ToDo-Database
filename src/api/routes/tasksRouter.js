const { Router } = require('express');
const {
  createTask, getAllTasks, getTaskById, updateTask, deleteTask,
} = require('../../controllers/tasksController');
const Auth = require('../../middlewares/Auth');
const { checkTaskEntries, checkIfPostsExists } = require('../../middlewares/taskMiddleware');

const router = Router();

router.use(Auth);

router.post('/', checkTaskEntries, createTask);
router.get('/:id', checkIfPostsExists, getTaskById);
router.get('/', getAllTasks);
router.put('/:id', checkIfPostsExists, checkTaskEntries, updateTask);
router.delete('/:id', checkIfPostsExists, deleteTask);

module.exports = router;
