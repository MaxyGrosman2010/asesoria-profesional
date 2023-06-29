const {Router} = require('express');
const router = Router();
const getServiceByUser = require('../handlers/getServiceByUser.handler');

router.get('/:id',  getServiceByUser);

module.exports = router;