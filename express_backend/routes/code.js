const express = require("express")
const router = express.Router()

const {
    run_code,
    status,
} = require("../controllers/code_controller")

router.post("/run", run_code)
router.get("/status", status)

module.exports = router
