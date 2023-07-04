const {Router} = require('express');
const router = Router();
const getServiceByUser = require('../handlers/getServiceByUser.handler');
const verifyToken = require('../middleware/verifyToken');

router.get('/:id',  getServiceByUser);

module.exports = router;