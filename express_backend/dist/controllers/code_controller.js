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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.status = exports.run_code = void 0;
const generateFile_1 = require("../code/generateFile");
const job_queue_1 = require("../code/job_queue");
const jobs_model_1 = __importDefault(require("../models/jobs_model"));
const run_code = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { language = 'cpp', code, problem_id } = req.body;
    if (code === undefined) {
        return res.status(400).json({ success: false, error: 'Empty code body!' });
    }
    let job;
    try {
        const filepath = (0, generateFile_1.generateFile)(language, code);
        job = yield new jobs_model_1.default({ language, filepath }).save();
        const jobId = job._id.toString();
        yield (0, job_queue_1.addJobToQueue)({ id: jobId, problemId: problem_id, language, filepath });
        return res.status(201).json({ jobId });
    }
    catch (error) {
        return res.status(500).json({ success: false, err: JSON.stringify(error) });
    }
});
exports.run_code = run_code;
const status = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobId = req.query.id;
        if (jobId === undefined) {
            return res.status(400).json({ success: false, error: 'missing id query param' });
        }
        const job_res = yield jobs_model_1.default.findById(jobId);
        if (job_res === null) {
            return res.status(400).json({ success: false, error: 'couldnt find job' });
        }
        return res.status(200).json({ success: true, job_res });
    }
    catch (err) {
        return res.status(401).json({ success: false, error: `There was an error getting status: ${JSON.stringify(err)}` });
    }
});
exports.status = status;
//# sourceMappingURL=code_controller.js.map