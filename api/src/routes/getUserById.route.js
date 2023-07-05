const {Router} = require('express');
const router = Router();
const getUserById = require('../handlers/getUserById.handler');
const verifyToken = require('../middleware/verifyToken')

router.get('/', verifyToken,  getUserById);

module.exports = router;