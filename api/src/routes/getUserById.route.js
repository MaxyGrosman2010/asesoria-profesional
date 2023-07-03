const {Router} = require('express');
const router = Router();
const getUserById = require('../handlers/getUserById.handler');

router.get('/',  getUserById);

module.exports = router;