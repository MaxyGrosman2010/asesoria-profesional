const { Router } = require('express');
const router = Router();
const {createPreference} = require('./mercadoPagoHandler')

router.post(createPreference);

module.exports = router;