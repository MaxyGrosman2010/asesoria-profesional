const {Router} = require('express');
const router = Router();
const getAllServiceAdmin = require('../handlers/getAllServiceAdmin.handler');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, getAllServiceAdmin);

module.exports = router;