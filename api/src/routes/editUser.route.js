const {Router} = require('express');
const router = Router();
const userEdit = require('../handlers/editUser.handle');

router.put('/', userEdit);

module.exports = router;