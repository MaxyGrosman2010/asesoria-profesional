const { Router } = require("express");
const router = Router();
const editService = require("../handlers/editService.handler");
const { uploadCreateService } = require("../config/multer.config");
const verifyToken = require('../middleware/verifyToken');
const validateService = require('../middleware/validateServiceUpdate')

router.put("/", verifyToken, uploadCreateService, validateService, editService);

module.exports = router;
