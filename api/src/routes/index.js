const {Router} = require('express');
const getRouter = require('./getRouter');

const router = Router();

router.use(getRouter);


module.exports = router;