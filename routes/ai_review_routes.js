const express = require("express");
const { reviewCode } = require("../controller/ai_review_controller");

const router = express.Router();

router.post("/", reviewCode);

module.exports = router;
