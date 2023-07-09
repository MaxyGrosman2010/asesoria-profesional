const {Router} = require('express');
const router = Router();
const logicalDeleteServiceAdmin = require('../handlers/manageLogicalDeleteServiceAdmin.handle');
const verifyToken = require('../middleware/verifyToken');

router.put('/', verifyToken, logicalDeleteServiceAdmin);

module.exports = router;