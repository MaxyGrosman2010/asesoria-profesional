const { Router } = require('express');
const router = Router();
const {getLogoutHandler} = require('../handlers/getLogInGoogleHandler');

router.get(getLogoutHandler);

module.exports = router;