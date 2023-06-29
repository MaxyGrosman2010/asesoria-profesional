const { Router } = require("express");
const router = Router();
const editService = require("../handlers/editService.handler");
const { uploadCreateService } = require("../config/multer.config");
const verifyToken = require('../middleware/verifyToken');

router.put("/", verifyToken, uploadCreateService, editService);

module.exports = router;
