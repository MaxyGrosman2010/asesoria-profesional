const { Router } = require('express');
const router = Router();
const {getLoginHandler} = require('../handlers/getLogInGoogleHandler');

router.get(getLoginHandler);

module.exports = router;