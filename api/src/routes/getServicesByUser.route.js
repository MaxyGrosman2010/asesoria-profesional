const {Router} = require('express');
const router = Router();
const getServiceByUser = require('../handlers/getServiceByUser.handler');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, getServiceByUser);

module.exports = router;