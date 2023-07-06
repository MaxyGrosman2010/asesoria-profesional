const { Router } = require('express');
const router = Router();
const { getFeedback } = require('./mercadoPagoHandler');

router.get('/', getFeedback);

module.exports = router;
