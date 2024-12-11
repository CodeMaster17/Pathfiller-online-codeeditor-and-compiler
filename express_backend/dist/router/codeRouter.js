"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const code_controller_1 = require("../controllers/code_controller");
const router = (0, express_1.Router)();
router.route('/run').post(code_controller_1.run_code);
router.route('/status').get(code_controller_1.status);
exports.default = router;
//# sourceMappingURL=codeRouter.js.map