const {Router} = require('express');
const router = Router();
const getAllUsersInfo = require('../handlers/getAllUsersInfo.handler');
const verifyToken = require('../middleware/verifyToken');

router.get("/", getAllUsersInfo);

module.exports = router;