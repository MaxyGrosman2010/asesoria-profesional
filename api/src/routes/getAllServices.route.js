const {Router} = require('express');
const router = Router();
const  getAllService = require('../handlers/getAllService.handler');

router.get('/', getAllService);

module.exports = router;