const {Router} = require('express');
const router = Router();
const getAllTypeService = require('../handlers/getAllTypeService.handler');

router.get("/", getAllTypeService);

module.exports = router;