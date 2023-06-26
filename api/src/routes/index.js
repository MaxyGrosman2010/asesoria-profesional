const {Router} = require('express');
// const getRouter = require('./getRouter.route');
const createServiceRouter = require('./createService.route');
const createTypeServiceRouter = require('./createTypeService.route');

const router = Router();

// router.use(getRouter);
router.use('/service', createServiceRouter);
router.use('/typeService', createTypeServiceRouter);

module.exports = router;