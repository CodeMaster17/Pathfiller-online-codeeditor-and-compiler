"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProblems = exports.getProblemById = exports.addProblemWithTagsAndTestCases = void 0;
const problem_model_1 = __importDefault(require("../models/problem_model"));
const tag_model_1 = __importDefault(require("../models/tag_model"));
const test_case_model_1 = __importDefault(require("../models/test_case_model"));
const httpResponse_1 = __importDefault(require("../utils/httpResponse"));
const responseMessage_1 = require("../constants/responseMessage");
const httpError_1 = __importDefault(require("../utils/httpError"));
const addProblemWithTagsAndTestCases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { testCases = [], tags = [], initialCode } = _a, problemData = __rest(_a, ["testCases", "tags", "initialCode"]);
        const tagIds = [];
        for (const tag of tags) {
            if (!tag.name) {
                return res.status(400).json({ message: 'Tag name cannot be null or empty' });
            }
            let existingTag = yield tag_model_1.default.findOne({ name: tag.name });
            if (!existingTag) {
                const newTag = yield tag_model_1.default.create(tag);
                tagIds.push(newTag._id.toString());
            }
            else {
                tagIds.push(existingTag._id.toString());
            }
        }
        const testCaseIds = [];
        for (const testCase of testCases) {
            const newTestCase = yield test_case_model_1.default.create(testCase);
            testCaseIds.push(newTestCase._id.toString());
        }
        const problem = {
            title: problemData.title,
            description: problemData.description,
            tags: tagIds,
            testCases: testCaseIds,
            initialCode
        };
        const newProblem = yield problem_model_1.default.create(problem);
        return res.status(201).json({ newProblem, message: 'Problem added successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: `There was an error adding the problem: ${JSON.stringify(err)}` });
    }
});
exports.addProblemWithTagsAndTestCases = addProblemWithTagsAndTestCases;
const getProblemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const problem = yield problem_model_1.default.findOne({ _id: id }).populate('testCases').populate('tags');
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        return res.status(200).json(problem);
    }
    catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.getProblemById = getProblemById;
const getAllProblems = (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const problems = yield problem_model_1.default.find().populate('testCases').populate('tags');
        (0, httpResponse_1.default)(_, res, 200, responseMessage_1.responseMessage.SUCCESS, problems);
    }
    catch (err) {
        (0, httpError_1.default)(next, err, _, 500);
    }
});
exports.getAllProblems = getAllProblems;
//# sourceMappingURL=problem_controller.js.map