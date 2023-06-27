const {Router} = require('express');
// const getRouter = require('./getRouter.route');
const createServiceRouter = require('./createService.route');
const createTypeServiceRouter = require('./createTypeService.route');
const getAllTypeServiceRouter = require('./getAllTypeService.route');

const router = Router();

// router.use(getRouter);
router.use('/service', createServiceRouter);
router.use('/typeService', createTypeServiceRouter);
router.use('/allTypeService', getAllTypeServiceRouter);

module.exports = router;