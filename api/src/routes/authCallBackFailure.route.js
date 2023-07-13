const { Router } = require('express');
const router = Router();
const {loginFailureHandler} = require('../handlers/getLogInGoogleHandler');

router.get("/auth/callback/failure", loginFailureHandler);

module.exports = router;