const { Router } = require('express');
// const getRouter = require('./getRouter.route');
const createServiceRouter = require('./createService.route');
const createTypeServiceRouter = require('./createTypeService.route');
const getAllTypeServiceRouter = require('./getAllTypeService.route');
const getAllServiceRouter = require('./getAllServices.route');
const getServiceById = require('./getServiceById.route');
const getServiceByName = require('./getServiceByName');

const router = Router();

// router.use(getRouter);
router.use('/service', createServiceRouter);
router.use('/typeService', createTypeServiceRouter);
router.use('/allTypeService', getAllTypeServiceRouter);
router.use('/allService', getAllServiceRouter);
router.use('/serviceById', getServiceById);
router.use('/nameService', getServiceByName);

module.exports = router;
