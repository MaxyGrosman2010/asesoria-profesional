const { Router } = require('express');
const router = Router();
const {loginSuccessHandler} = require('../handlers/getLogInGoogleHandler');

router.get("/auth/callback/success", loginSuccessHandler);

module.exports = router;