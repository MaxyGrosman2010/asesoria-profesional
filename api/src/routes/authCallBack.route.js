const { Router } = require('express');
const router = Router();
const {authCallbackHandler} = require('../handlers/getLogInGoogleHandler');

router.get("/auth/callback",authCallbackHandler);

module.exports = router;