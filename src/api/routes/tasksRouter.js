const { Router } = require('express');
const {
  createTask, getAllTasks, getTaskById, updateTask, deleteTask,
} = require('../../controllers/tasksController');
const Auth = require('../../middlewares/Auth');

const router = Router();

router.use(Auth);

router.post('/', createTask);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
