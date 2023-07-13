const { Router } = require('express');
const router = Router();
const getServiceById = require('../handlers/getServiceById.handler');
const validateServiceById = require('../middleware/validateServiceById');

router.get('/:idService', validateServiceById, getServiceById);

module.exports = router;
