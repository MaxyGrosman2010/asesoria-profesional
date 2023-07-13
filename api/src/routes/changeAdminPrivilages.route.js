const {Router} = require('express');
const router = Router();
const changeAdminPrivilages = require('../handlers/changeAdminPrivilages.handler');
const verifyToken = require('../middleware/verifyToken');

router.put('/', verifyToken, changeAdminPrivilages);

module.exports = router;