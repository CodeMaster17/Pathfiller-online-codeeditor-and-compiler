"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const problem_controller_1 = require("../controllers/problem_controller");
const router = (0, express_1.Router)();
router.route('/add').post(problem_controller_1.addProblemWithTagsAndTestCases);
router.route('/get/:id').get(problem_controller_1.getProblemById);
router.route('/all').get(problem_controller_1.getAllProblems);
exports.default = router;
//# sourceMappingURL=problemRouter.js.map