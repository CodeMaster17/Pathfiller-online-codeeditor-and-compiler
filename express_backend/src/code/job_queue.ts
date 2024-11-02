import { Queue, Worker, Job } from 'bullmq';
import jobs from '../models/jobs_model';
import { executeCpp } from './code_execution/execute_cpp';
import { executePy } from './code_execution/executePy';
import Problem from '../models/problem_model';
import getRedisClient from '../config/get_redis_client';

const redisClient = getRedisClient();

interface JobData {
    problemId: string;
    language: 'cpp' | 'py';
    filepath: string;
    id: string;
}

interface Mismatch {
    input: string;
    expectedOutput: string;
    actualOutput: string;
}

interface TestCase {
    input: string;
    output: string;
}

// Create a new BullMQ queue
const jobQueue = new Queue('job-queue', {
    connection: redisClient
});

const worker = new Worker<JobData>(
    'job-queue',
    async (job: Job<JobData>) => {
        console.log(job.data);

        // finding the id of the job from the data
        const jobId = job.data.id;

        // finding the job with id of the job
        const jobDoc = await jobs.findById(jobId);

        // if jobDOc does not exists, throw error
        if (!jobDoc) {
            throw new Error(`Cannot find Job with id ${jobId}`);
        }

        const problemId = job.data.problemId;
        const problem = await Problem.findOne({ id: problemId }).populate<{ testCases: TestCase[] }>('testCases', 'input output'); // Ensure fields are populated
        if (!problem) {
            throw new Error(`Cannot find Problem with id ${problemId}`);
        }

        const mismatches: Mismatch[] = [];
        try {
            let output: string | undefined;
            jobDoc.startedAt = new Date();

            if (jobDoc.language === 'cpp') {
                for (const testCase of problem.testCases) {
                    output = await executeCpp(jobDoc.filepath, testCase.input);

                    if (output && output.trim() !== testCase.output.trim()) {
                        mismatches.push({
                            input: testCase.input,
                            expectedOutput: testCase.output,
                            actualOutput: output
                        });
                    }
                }
            } else if (jobDoc.language === 'py') {
                for (const testCase of problem.testCases) {
                    output = await executePy(jobDoc.filepath, testCase.input);

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

            await jobDoc.save();
            return true;
        } catch (err) {
            jobDoc.completedAt = new Date();
            jobDoc.output = JSON.stringify(err);
            jobDoc.status = 'error';
            jobDoc.set('mismatches', mismatches);

            await jobDoc.save();
            throw err;
        }
    },
    {
        connection: redisClient,
        concurrency: 5
    }
);

worker.on('failed', (job: Job<JobData> | undefined, err: Error) => {
    if (job) {
        console.error(`Job ${job.id} failed with error:`, err);
    } else {
        console.error('A job failed, but the job instance is undefined.', err);
    }
});

process.on('SIGINT', async () => {
    await worker.close();
    await redisClient.quit();
    process.exit(0);
});

const addJobToQueue = async ({ id, problemId, language, filepath }: JobData) => {
    try {
        console.log('problemId', problemId);
        await jobQueue.add('job', {
            id: id, // it refers to the id of the job
            problemId: problemId,
            language: language,
            filepath: filepath
        });
    } catch (err) {
        console.error(`Error adding job ${id} to queue:`, err);
    }
};

export { addJobToQueue };

