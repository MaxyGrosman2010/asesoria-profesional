const {Router} = require('express');
const router = Router();
const createService = require('../handlers/createService.handler');

router.post('/', createService);

module.exports = router;