const { Router } = require('express');
const router = Router();
const logicalSoldServiceByUser = require('../handlers/manageLogicalSoldServiceByUser.handle');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, logicalSoldServiceByUser);

module.exports = router;
