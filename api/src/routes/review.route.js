const { Router } = require("express");
const { reviewHandler } = require("../handlers/review.handler");
const validateReview = require("../middleware/validateReview");
const verifyToken = require("../middleware/verifyToken");


const router = Router();

router.post("/", verifyToken, validateReview, reviewHandler);

module.exports = router;
