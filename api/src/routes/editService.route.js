const {Router} = require('express');
const router = Router();
const createService = require('../handlers/createService.handler');
const validateCreateServices = require('../middleware/validateService');
const {uploadCreateService} = require('../config/multer.config');

router.post('/', uploadCreateService, validateCreateServices, createService);

module.exports = router;