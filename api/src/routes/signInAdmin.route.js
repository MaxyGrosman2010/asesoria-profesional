const { Router } = require("express");
const signInAdmin = require('../handlers/signInAdmin.handler');
const validateSingIn = require("../middleware/validateSingIn");

const router = Router();

router.post("/", validateSingIn, signInAdmin);

module.exports = router;