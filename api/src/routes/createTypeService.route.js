const { Router } = require('express');
const router = Router();
const createTypeService = require('../handlers/createTypeService.handler');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, createTypeService);

//router.post('/', createTypeService);
module.exports = router;
