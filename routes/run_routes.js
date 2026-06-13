const express = require("express");
const router = express.Router();
const {runcode} = require("../controller/run_controller");

router.post("/", runcode);


module.exports = router;