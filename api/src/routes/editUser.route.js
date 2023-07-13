const { Router } = require('express');
const router = Router();
const userEdit = require('../handlers/editUser.handle');
const { uploadSingUp } = require('../config/multer.config');
const verifyToken = require('../middleware/verifyToken');

router.put('/', verifyToken, uploadSingUp, userEdit);

module.exports = router;
