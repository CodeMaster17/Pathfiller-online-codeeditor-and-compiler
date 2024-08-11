const Queue = require('bull');
const jobs = require('../models/jobs');
const { executeCpp } = require('./code_execution/execute_cpp');
const { executePy } = require('./code_execution/executePy');
const Problem = require('../models/problem_model');

const jobQueue = new Queue('job-queue');
const NUM_WORKERS = 5;

jobQueue.process(NUM_WORKERS, async ({ data }) => {
    const jobId = data.id;
    const job = await jobs.findById(jobId);
    if (job === undefined) {
        throw Error(`cannot find Job with id ${jobId}`);
    }
    console.log("data", data)
    try {
        const mismatches = []
        console.log("Inside try block of jobQueue")
        const problem = await Problem.findOne({ id: data.problemId }).populate('testCases');

        console.log("problem", problem)
        if (!problem) {
            console.log("Inside not of problem", data.problemId)
            throw Error(`Cannot find Problem with id ${data.problemId}`);
        }
        console.log("problem", problem)

        let output;
        job["startedAt"] = new Date();
        if (job.language === "cpp") {
            for (const testCase of problem.testCases) {
                "Inside loop"

                output = await executeCpp(job.filepath, testCase.input);
                console.log("output", output)

                if (output.trim() !== testCase.output.trim()) {
                    mismatches.push({
                        input: testCase.input,
                        expectedOutput: testCase.output,
                        actualOutput: output
                    });
                }

            }
        } else if (job.language === "py") {
            output = await executePy(job.filepath);
        }
        job["completedAt"] = new Date();
        job["output"] = output;
        job["status"] = mismatches.length ? "error" : "success";
        job["mismatches"] = mismatches;
        await job.save();
        return true;
    } catch (err) {
        job["completedAt"] = new Date();
        job["output"] = JSON.stringify(err);
        job["status"] = "error";
        job.status = "error";
        job.mismatches = mismatches;
        await job.save();
        throw Error(JSON.stringify(err));
    }
})

jobQueue.on("failed", (error) => {
    console.error(error.data.id, error.failedReason);
});

const addJobToQueue = async ({ jobId, problemId, language, filepath }) => {
    await jobQueue.add({
        id: jobId,
        problemId: problemId,
        language: language,
        filepath: filepath
    });
}

module.exports = {
    addJobToQueue
}