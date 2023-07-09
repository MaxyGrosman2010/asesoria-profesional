const { Router } = require('express');
const createServiceRouter = require('./createService.route');
const createTypeServiceRouter = require('./createTypeService.route');
const getAllTypeServiceRouter = require('./getAllTypeService.route');
const getAllServiceRouter = require('./getAllServices.route');
const getServiceById = require('./getServiceById.route');
const getServiceByName = require('./getServiceByName');
const getLoginHandlerRouter = require('./getLoginHandler.route');
const authenticateHandlerRouter = require('./authenticateHandler.route');
const authCallbackHandlerRouter = require('./authCallBack.route');
const loginSuccessHandlerRouter = require('./authCallBackSuccess.route');
const loginFailureHandlerRouter = require('./authCallBackFailure.route');
const logoutHandlerRouter = require('./getLogoutHandler.route');
require('../middleware/passport');
const singUpRouter = require('./singUp.router');
const singInRouter = require('./singIn.router');
const editUserRouter = require('./editUser.route');
const editServiceRouter = require('./editService.route');
const createPreferenceRouter = require('./createPreference.route');
const feedbackRouter = require('./feedback.route');
const getServicesByUserRouter = require('./getServicesByUser.route');
const getUserByIdRouter = require("./getUserById.route");
const reviewRouter = require("./review.route");
const getAllUsersInfoRouter = require('./getAllUsersInfo.route');
const changeAdminPrivilagesRouter = require('./changeAdminPrivilages.route');
const manageLogicalDeleteUserRouter = require('./manageDeleteUser.route');
const manageLogicalDeleteServiceRouter = require('./manageLogicalDeleteService.route');
const manageLogicalDeleteServiceAdminRouter = require('./managaLogicalDeleteServiceAdmin.route');
const router = Router();

router.use('/service', createServiceRouter);
router.use('/typeService', createTypeServiceRouter);
router.use('/allTypeService', getAllTypeServiceRouter);
router.use('/allService', getAllServiceRouter);
router.use('/serviceById', getServiceById);
router.use('/nameService', getServiceByName);
router.use('/singUp', singUpRouter);
router.use('/singIn', singInRouter);
router.use('/editUser', editUserRouter);
router.use('/editService', editServiceRouter);
router.use('/getUserById', getUserByIdRouter);
router.use('/getServiceByUser', getServicesByUserRouter);
router.use("/review", reviewRouter);
router.use('/allUsers', getAllUsersInfoRouter);
router.use('/changeAdmin', changeAdminPrivilagesRouter);
router.use('/deleteUser', manageLogicalDeleteUserRouter);
router.use('/deleteService', manageLogicalDeleteServiceRouter);
router.use('/deleteServiceAdmin', manageLogicalDeleteServiceAdminRouter)

//!REFERIDO A LOGIN GOOGLE
router.use("/loginGoogle", getLoginHandlerRouter);
router.use(authenticateHandlerRouter);
router.use(authCallbackHandlerRouter);
router.use(loginSuccessHandlerRouter);
router.use(loginFailureHandlerRouter);
router.use("/logout", logoutHandlerRouter)
//!REFERIDO A MERCADOPAGO
router.use('/orderMP', createPreferenceRouter);
router.use('/feedback', feedbackRouter);

module.exports = router;