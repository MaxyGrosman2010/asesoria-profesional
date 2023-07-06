const { Router } = require('express');
const router = Router();
const {authCallbackHandler} = require('../handlers/getLogInGoogleHandler');

router.get(authCallbackHandler);

module.exports = router;