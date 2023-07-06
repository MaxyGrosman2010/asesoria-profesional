const { Router } = require('express');
const router = Router();
const {loginFailureHandler} = require('../handlers/getLogInGoogleHandler');

router.get(loginFailureHandler);

module.exports = router;