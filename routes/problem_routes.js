const express = require("express");
const router = express.Router();
const {getAllProblems, getProblemById, createProblem, updateProblem, deleteProblem} = require("../controller/problem_controller");

router.get("/", getAllProblems);
router.post("/", createProblem);
router.get("/:id", getProblemById);
router.put("/:id", updateProblem);
router.delete("/:id", deleteProblem);

module.exports = router;