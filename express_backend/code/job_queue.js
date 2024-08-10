const Queue = require('bull');
const jobs = require('../models/jobs');
const { executeCpp } = require('./code_execution/execute_cpp');
const { executePy } = require('./code_execution/executePy');

const jobQueue = new Queue('job-queue');
const NUM_WORKERS = 5;

jobQueue.process(NUM_WORKERS, async ({ data }) => {
    const jobId = data.id;
    const job = await jobs.findById(jobId);
    if (job === undefined) {
        throw Error(`cannot find Job with id ${jobId}`);
    }
    try {
        let output;
        job["startedAt"] = new Date();
        if (job.language === "cpp") {
            output = await executeCpp(job.filepath);
        } else if (job.language === "py") {
            output = await executePy(job.filepath);
        }
        job["completedAt"] = new Date();
        job["output"] = output;
        job["status"] = "success";
        await job.save();
        return true;
    } catch (err) {
        job["completedAt"] = new Date();
        job["output"] = JSON.stringify(err);
        job["status"] = "error";
        await jobs.save();
        throw Error(JSON.stringify(err));
    }
})

jobQueue.on("failed", (error) => {
    console.error(error.data.id, error.failedReason);
});

const addJobToQueue = async (jobId) => {
    await jobQueue.add({ id: jobId })
}

module.exports = {
    addJobToQueue
}