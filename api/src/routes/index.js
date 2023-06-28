const { Router } = require("express");
// const getRouter = require('./getRouter.route');
const createServiceRouter = require("./createService.route");
const createTypeServiceRouter = require("./createTypeService.route");
const getAllTypeServiceRouter = require("./getAllTypeService.route");
const getAllServiceRouter = require("./getAllServices.route");
const getServiceById = require("./getServiceById.route");
const getServiceByName = require("./getServiceByName");
const getLogInHandler = require("../handlers/getLogInGoogleHandler");
require("../middleware/passport");
const singUpRouter = require("./singUp.router");
const singInRouter = require("./singIn.router");

const router = Router();

// router.use(getRouter);
router.use("/service", createServiceRouter);
router.use("/typeService", createTypeServiceRouter);
router.use("/allTypeService", getAllTypeServiceRouter);
router.use("/allService", getAllServiceRouter);
router.use("/serviceById", getServiceById);
router.use("/nameService", getServiceByName);
router.use("/singUp", singUpRouter);
router.use("/singIn", singInRouter);
//!REFERIDO A LOGIN GOOGLE
router.get("/loginGoogle", getLogInHandler.getLogin);
router.get("/auth", getLogInHandler.authenticate);
router.get("/auth/callback", getLogInHandler.authCallback);
router.get("/auth/callback/success", getLogInHandler.loginSuccess);
router.get("/auth/callback/failure", getLogInHandler.loginFailure);
router.post("/logout", getLogInHandler.getLogout);

module.exports = router;