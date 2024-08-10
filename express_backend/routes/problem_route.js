const express = require("express")
const router = express.Router()

const { addProblemWithTagsAndTestCases, getProblemById } = require('../controllers/problem_controller')
console.log("problem route")
router.post("/add", addProblemWithTagsAndTestCases)
router.get("/get/:id", getProblemById)

module.exports = router
