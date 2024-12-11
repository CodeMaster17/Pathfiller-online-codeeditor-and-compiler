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
exports.addJobToQueue = void 0;
const bullmq_1 = require("bullmq");
const jobs_model_1 = __importDefault(require("../models/jobs_model"));
const execute_cpp_1 = require("./code_execution/execute_cpp");
const executePy_1 = require("./code_execution/executePy");
const problem_model_1 = __importDefault(require("../models/problem_model"));
const get_redis_client_1 = __importDefault(require("../config/get_redis_client"));
const redisClient = (0, get_redis_client_1.default)();
const jobQueue = new bullmq_1.Queue('job-queue', {
    connection: redisClient
});
const worker = new bullmq_1.Worker('job-queue', (job) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(job.data);
    const jobId = job.data.id;
    const jobDoc = yield jobs_model_1.default.findById(jobId);
    if (!jobDoc) {
        throw new Error(`Cannot find Job with id ${jobId}`);
    }
    const problemId = job.data.problemId;
    const problem = yield problem_model_1.default.findOne({ id: problemId }).populate('testCases', 'input output');
    if (!problem) {
        throw new Error(`Cannot find Problem with id ${problemId}`);
    }
    const mismatches = [];
    try {
        let output;
        jobDoc.startedAt = new Date();
        if (jobDoc.language === 'cpp') {
            for (const testCase of problem.testCases) {
                output = yield (0, execute_cpp_1.executeCpp)(jobDoc.filepath, testCase.input);
                if (output && output.trim() !== testCase.output.trim()) {
                    mismatches.push({
                        input: testCase.input,
                        expectedOutput: testCase.output,
                        actualOutput: output
                    });
                }
            }
        }
        else if (jobDoc.language === 'py') {
            for (const testCase of problem.testCases) {
                output = yield (0, executePy_1.executePy)(jobDoc.filepath, testCase.input);
                if (output && output.trim() !== testCase.output.trim()) {
                    mismatches.push({
                        input: testCase.input,
                        expectedOutput: testCase.output,
                        actualOutput: output
                    });
                }
            }
        }
        jobDoc.completedAt = new Date();
        jobDoc.output = output;
        jobDoc.status = mismatches.length ? 'error' : 'success';
        jobDoc.set('mismatches', mismatches);
        yield jobDoc.save();
        return true;
    }
    catch (err) {
        jobDoc.completedAt = new Date();
        jobDoc.output = JSON.stringify(err);
        jobDoc.status = 'error';
        jobDoc.set('mismatches', mismatches);
        yield jobDoc.save();
        throw err;
    }
}), {
    connection: redisClient,
    concurrency: 5
});
worker.on('failed', (job, err) => {
    if (job) {
        console.error(`Job ${job.id} failed with error:`, err);
    }
    else {
        console.error('A job failed, but the job instance is undefined.', err);
    }
});
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    yield worker.close();
    yield redisClient.quit();
    process.exit(0);
}));
const addJobToQueue = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, problemId, language, filepath }) {
    try {
        console.log('problemId', problemId);
        yield jobQueue.add('job', {
            id: id,
            problemId: problemId,
            language: language,
            filepath: filepath
        });
    }
    catch (err) {
        console.error(`Error adding job ${id} to queue:`, err);
    }
});
exports.addJobToQueue = addJobToQueue;
//# sourceMappingURL=job_queue.js.map