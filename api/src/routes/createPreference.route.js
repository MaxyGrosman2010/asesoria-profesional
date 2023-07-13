const { Router } = require('express');
const router = Router();
const { createPreference } = require('./mercadoPagoHandler');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, createPreference);

module.exports = router;
