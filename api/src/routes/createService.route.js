const {Router} = require('express');
const router = Router();
const createService = require('../handlers/createService.handler');
const validateCreateServices = require('../middleware/validateService');

router.post('/', validateCreateServices, createService);

module.exports = router;