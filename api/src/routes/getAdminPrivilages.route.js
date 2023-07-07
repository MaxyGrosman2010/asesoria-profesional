const {Router} = require('express');
const router = Router();
const getAdminPrivilages = require('../handlers/getAdminPrivilages.handler');
const verifyToken = require('../middleware/verifyToken');

router.put('/', verifyToken, getAdminPrivilages);

module.exports = router;