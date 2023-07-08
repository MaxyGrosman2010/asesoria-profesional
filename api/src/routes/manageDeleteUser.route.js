const {Router} = require('express');
const router = Router();
const manageLogicalDeleteUser = require('../handlers/manageDeleteUser.handler');
const verifyToken = require('../middleware/verifyToken');

router.put('/', verifyToken, manageLogicalDeleteUser);

module.exports = router;