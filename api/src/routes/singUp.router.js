const { Router } = require("express");
const  singUp  = require("../handlers/singUp.handler");
const { validateSingUp } = require("../middleware/validateSingUpData");
const { uploadSingUp } = require("../config/multer.config");


const router = Router();

router.post("/",uploadSingUp, singUp);

module.exports = router;
