const { Router } = require("express");
const router = Router();
const contactUsHandler = require("../handlers/contactUs.handler");

router.post("/", contactUsHandler);

module.exports = router;
