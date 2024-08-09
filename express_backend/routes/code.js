const express = require("express")
const router = express.Router()

const {
    run_code,
} = require("../controllers/code_controller")

router.post("/run", run_code)

module.exports = router
