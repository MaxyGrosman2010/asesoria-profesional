const {Router} = require('express');
const router = Router();
const getAllService = require('../handlers/getAllService.handler');
const verifyToken = require("../middleware/verifyToken");

router.get('/', getAllService);

module.exports = router;