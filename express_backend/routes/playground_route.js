const express = require("express")
const router = express.Router()

const {
    run_code_playground,
    status_playground,
} = require("../controllers/code_playground_controller")

router.post("/run", run_code_playground)
router.get("/status", status_playground)

module.exports = router
