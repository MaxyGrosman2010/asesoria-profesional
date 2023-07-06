const { Router } = require('express');
const router = Router();
const {loginSuccessHandler} = require('../handlers/getLogInGoogleHandler');

router.get(loginSuccessHandler);

module.exports = router;