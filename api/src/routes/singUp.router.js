const { Router } = require("express");
const  singUp  = require("../handlers/singUp.handler");
const { validateSingUp } = require("../middleware/validateSingUpData");

const router = Router();

router.post("/", validateSingUp, singUp);

module.exports = router;
