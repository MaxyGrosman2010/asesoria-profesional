const { Router } = require("express");
const { singInHandler } = require("../handlers/singIn.handler");
const validateSingIn = require("../middleware/validateSingIn");

const router = Router();

router.post("/", validateSingIn, singInHandler);

module.exports = router;
