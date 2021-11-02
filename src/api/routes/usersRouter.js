const { Router } = require('express');
const { createUser } = require('../../controllers/UserController');
const { checkNewUserEntries } = require('../../middlewares/userMiddleware');

const router = Router();

router.post('/', checkNewUserEntries, createUser);

module.exports = router;
