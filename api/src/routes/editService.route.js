const {Router} = require('express');
const router = Router();
const editService = require('../handlers/editService.handler');
const {uploadCreateService} = require('../config/multer.config');

router.put('/', uploadCreateService, editService);

module.exports = router;