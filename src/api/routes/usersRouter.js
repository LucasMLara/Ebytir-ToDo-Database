const { Router } = require('express');
const userController = require('../../controllers/UserController');

const router = Router();

router.post('/', userController.createUser);

module.exports = router;
