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
exports.addJobToQueueForPlayground = void 0;
const bull_1 = __importDefault(require("bull"));
const jobs_model_1 = __importDefault(require("../models/jobs_model"));
const execute_cpp_1 = require("./code_execution/execute_cpp");
const executePy_1 = require("./code_execution/executePy");
const jobQueuePlayground = new bull_1.default('job-queue-playground');
const NUM_WORKERS = 5;
jobQueuePlayground.process(NUM_WORKERS, (_a) => __awaiter(void 0, [_a], void 0, function* ({ data }) {
    const jobId = data.id;
    const jobData = yield jobs_model_1.default.findById(jobId);
    if (!jobData) {
        throw new Error(`Cannot find Job with id ${jobId}`);
    }
    try {
        let output;
        if (jobData === undefined) {
            throw Error(`cannot find Job with id ${jobId}`);
        }
        jobData['startedAt'] = new Date();
        if (jobData.language === 'cpp') {
            output = yield (0, execute_cpp_1.executeCpp)(jobData.filepath, data.inputs);
        }
        else if (jobData.language === 'py') {
            output = yield (0, executePy_1.executePy)(jobData.filepath, data.inputs);
        }
        jobData['completedAt'] = new Date();
        jobData['output'] = output;
        jobData['status'] = 'success';
        yield jobData.save();
        return true;
    }
    catch (err) {
        jobData['completedAt'] = new Date();
        jobData['output'] = JSON.stringify(err);
        jobData['status'] = 'error';
        yield jobData.save();
        throw Error(JSON.stringify(err));
    }
}));
jobQueuePlayground.on('failed', (error) => {
    console.error(error.data.id, error.failedReason);
});
const addJobToQueueForPlayground = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, inputs, language, filepath }) {
    yield jobQueuePlayground.add({
        id: id,
        inputs: inputs,
        language: language,
        filepath: filepath
    });
});
exports.addJobToQueueForPlayground = addJobToQueueForPlayground;
//# sourceMappingURL=job_queue_playground.js.map