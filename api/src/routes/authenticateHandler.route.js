const { Router } = require('express');
const router = Router();
const {authenticateHandler} = require('../handlers/getLogInGoogleHandler');

router.get(authenticateHandler);

module.exports = router;