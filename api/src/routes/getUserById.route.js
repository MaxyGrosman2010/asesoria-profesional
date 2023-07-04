const {Router} = require('express');
const router = Router();
const getUserById = require('../handlers/getUserById.handler');

router.get('/:id',  getUserById);

module.exports = router;