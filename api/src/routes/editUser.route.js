const {Router} = require('express');
const router = Router();
const userEdit = require('../handlers/editUser.handle');
const {uploadSingUp} = require('../config/multer.config');

router.put('/', uploadSingUp, userEdit);

module.exports = router;