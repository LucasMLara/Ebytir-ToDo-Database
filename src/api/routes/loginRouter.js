const { Router } = require('express');
const { login } = require('../../controllers/UserController');
const { checkLogin } = require('../../middlewares/userMiddleware');

const router = Router();
router.post('/', checkLogin, login);

module.exports = router;
