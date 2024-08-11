const Queue = require('bull');
const jobs = require('../models/jobs');
const { executeCpp } = require('./code_execution/execute_cpp');
const { executePy } = require('./code_execution/executePy');

const jobQueuePlayground = new Queue('job-queue-playground');
const NUM_WORKERS = 5;

jobQueuePlayground.process(NUM_WORKERS, async ({ data }) => {
    const jobId = data.id;
    const job = await jobs.findById(jobId);
    if (job === undefined) {
        throw Error(`cannot find Job with id ${jobId}`);
    }
    console.log("data", data)
    try {
        console.log("Inside try block of jobQueue of playground")
        let output;
        job["startedAt"] = new Date();
        if (job.language === "cpp") {
            output = await executeCpp(job.filepath, data.inputs);
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
        await job.save();
        throw Error(JSON.stringify(err));
    }
})

jobQueuePlayground.on("failed", (error) => {
    console.error(error.data.id, error.failedReason);
});

const addJobToQueueForPlayground = async ({ jobId, inputs, language, filepath }) => {
    await jobQueuePlayground.add({
        id: jobId,
        inputs: inputs,
        language: language,
        filepath: filepath
    });
}

module.exports = {
    addJobToQueueForPlayground
}