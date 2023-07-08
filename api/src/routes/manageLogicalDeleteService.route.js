const {Router} = require('express');
const router = Router();
const manageLogicalDeleteService = require('../handlers/manageLogicalDeleteService.handle');
const verifyToken = require('../middleware/verifyToken');

router.put('/', verifyToken, manageLogicalDeleteService);

module.exports = router;