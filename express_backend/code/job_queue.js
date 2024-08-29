const { Queue, Worker, QueueScheduler } = require('bullmq');
const jobs = require('../models/jobs');
const { executeCpp } = require('./code_execution/execute_cpp');
const { executePy } = require('./code_execution/executePy');
const Problem = require('../models/problem_model');

const Redis = require('ioredis');
const redisUrl = process.env.UPSTASH_REDIS_URL;
const redisToken = process.env.UPSTASH_REDIS_TOKEN;

const redisClient = new Redis("rediss://default:Aex2AAIjcDE1ZDI1MTQ0YTRiYTY0NWRiODUyYzk2NmE5ZGI2NTg5NXAxMA@prompt-alien-60534.upstash.io:6379", {
    maxRetriesPerRequest: null
})

// Create a new BullMQ queue
const jobQueue = new Queue('job-queue', {
    connection: redisClient
});


// Create a worker to process jobs
const worker = new Worker('job-queue', async job => {
    const jobId = job.data.id;
    console.log(jobId)
    const jobDoc = await jobs.findById(jobId);
    if (!jobDoc) {
        throw new Error(`Cannot find Job with id ${jobId}`);
    }

    const problemId = job.data.problemId; // Use job.data to access problemId

    const problem = await Problem.findOne({ id: problemId }).populate('testCases');

    if (!problem) {
        throw Error(`Cannot find Problem with id ${problemId}`);
    }

    console.log("Processing job:", job.data);

    const mismatches = [];
    try {
        let output;
        jobDoc.startedAt = new Date();

        if (jobDoc.language === "cpp") {
            for (const testCase of problem.testCases) {
                output = await executeCpp(jobDoc.filepath, testCase.input);
                if (output.trim() !== testCase.output.trim()) {
                    mismatches.push({
                        input: testCase.input,
                        expectedOutput: testCase.output,
                        actualOutput: output
                    });
                }
            }
        } else if (jobDoc.language === "py") {
            output = await executePy(jobDoc.filepath);
        }

        jobDoc.completedAt = new Date();
        jobDoc.output = output;
        jobDoc.status = mismatches.length ? "error" : "success";
        jobDoc.mismatches = mismatches;

        await jobDoc.save();
        return true;
    } catch (err) {
        jobDoc.completedAt = new Date();
        jobDoc.output = JSON.stringify(err);
        jobDoc.status = "error";
        jobDoc.mismatches = mismatches;

        await jobDoc.save();
        throw err;
    }
}, {
    connection: redisClient
});


worker.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed with error:`, err);
});

// Add jobs to the queue
const addJobToQueue = async ({ jobId, problemId, language, filepath }) => {
    await jobQueue.add('job', {
        id: jobId,
        problemId: problemId,
        language: language,
        filepath: filepath
    });
}

module.exports = {
    addJobToQueue
}
