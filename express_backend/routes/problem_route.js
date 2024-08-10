const express = require("express")
const router = express.Router()

const { addProblemWithTagsAndTestCases, getProblemById, getAllProblems } = require('../controllers/problem_controller')
console.log("problem route")
router.post("/add", addProblemWithTagsAndTestCases)
router.get("/get/:id", getProblemById)
router.get("/all", getAllProblems);

module.exports = router
