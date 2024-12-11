"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const code_playground_controller_1 = require("../controllers/code_playground_controller");
const router = (0, express_1.Router)();
router.route('/run').post(code_playground_controller_1.run_code_playground);
router.route('/status').get(code_playground_controller_1.status_playground);
exports.default = router;
//# sourceMappingURL=playgroundRouter.js.map