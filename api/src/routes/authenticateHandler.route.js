const { Router } = require('express');
const router = Router();
const {authenticateHandler} = require('../handlers/getLogInGoogleHandler');

router.get("/auth", authenticateHandler);

module.exports = router;