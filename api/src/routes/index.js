const { Router } = require('express');
// const getRouter = require('./getRouter.route');
const createServiceRouter = require('./createService.route');
const createTypeServiceRouter = require('./createTypeService.route');
const getAllTypeServiceRouter = require('./getAllTypeService.route');
const getAllServiceRouter = require('./getAllServices.route');
const getServiceById = require('./getServiceById.route');
const getServiceByName = require('./getServiceByName');
const {
  getLoginHandler,
  authenticateHandler,
  authCallbackHandler,
  loginSuccessHandler,
  loginFailureHandler,
  getLogoutHandler,
} = require("../handlers/getLogInGoogleHandler");
require('../middleware/passport');
const singUpRouter = require('./singUp.router');
const singInRouter = require('./singIn.router');
const editUserRouter = require('./editUser.route');
const editServiceRouter = require('./editService.route');
const mercadoPagoHandler = require('./mercadoPagoHandler');
const getServicesByUserRouter = require('./getServicesByUser.route');
const getUserByIdRouter = require('./getUserById.route')
const router = Router();

// router.use(getRouter);
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
//!REFERIDO A LOGIN GOOGLE
router.get("/loginGoogle", getLoginHandler);
router.get("/auth", authenticateHandler);
router.get("/auth/callback", authCallbackHandler);
router.get("/auth/callback/success", loginSuccessHandler);
router.get("/auth/callback/failure", loginFailureHandler);
router.post("/logout", getLogoutHandler);
//!REFERIDO A MERCADOPAGO
router.post('/orderMP', mercadoPagoHandler.createPreference);
router.get('/feedback', mercadoPagoHandler.getFeedback);

module.exports = router;
