const express = require("express");
const router = express.Router();
const {getAllProblems, getProblemById, createProblem, updateProblem, deleteProblem} = require("../controller/problem_controller");
const auth = require("../middleware/user_auth_middleware");
const admin = require("../middleware/admin_middleware");

router.get("/", getAllProblems);
router.post("/", auth, admin, createProblem);
router.get("/:id", getProblemById);
router.put("/:id", auth, admin, updateProblem);
router.delete("/:id", auth, admin, deleteProblem);

module.exports = router;
