const {Router} = require('express');
const router = Router();
const getAllTypeService = require('../handlers/getAllTypeService.handler');
const verifyToken = require("../middleware/verifyToken");

router.get("/", getAllTypeService);

module.exports = router;