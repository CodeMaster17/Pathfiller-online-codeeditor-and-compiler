import { generateFile } from '../code/generateFile';
import jobs from '../models/jobs_model';
import { addJobToQueueForPlayground } from '../code/job_queue_playground';
import { Request, Response } from 'express';

export const run_code_playground = async (req: Request, res: Response): Promise<Response> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { language = 'cpp', code, inputs }: { language: 'cpp' | 'py'; code: any; inputs: string[] } = req.body;

    if (code === undefined) {
        return res.status(400).json({ success: false, error: 'Empty code body!' });
    }
    let job;
    try {
        const filepath = generateFile(language, code);
        job = await new jobs({ language, filepath }).save();
        const jobId = job._id.toString();

        await addJobToQueueForPlayground({ id: jobId, inputs, language, filepath });
        return res.status(201).json({ jobId });
    } catch (error) {
        return res.status(500).json({ success: false, err: JSON.stringify(error) });
    }
};

export const status_playground = async (req: Request, res: Response): Promise<Response> => {
    try {
        const jobId = req.query.id;

        if (jobId === undefined) {
            return res.status(400).json({ success: false, error: 'missing id query param' });
        }

        const job_res = await jobs.findById(jobId);

        if (job_res === undefined) {
            return res.status(400).json({ success: false, error: 'Cannot find job' });
        }

        return res.status(200).json({ success: true, job_res });
    } catch (err) {
        return res.status(401).json({ success: false, error: `There was error gettting status: ${JSON.stringify(err)}` });
    }
};

