const {Router} = require('express');
const router = Router();
const createTypeService = require('../handlers/createTypeService.handler');

router.post('/', createTypeService);

module.exports = router;