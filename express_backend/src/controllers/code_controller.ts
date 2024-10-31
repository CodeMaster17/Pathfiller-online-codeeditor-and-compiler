import { Request, Response } from 'express';
import { generateFile } from '../code/generateFile';
import jobs from '../models/jobs_model';
import { addJobToQueue } from '../code/job_queue';

export const run_code = async (req: Request, res: Response): Promise<Response> => {
    const { language = 'cpp', code, problemId } = req.body;

    console.log(language, 'Length:', code.length);

    if (code === undefined) {
        return res.status(400).json({ success: false, error: 'Empty code body!' });
    }

    let job;
    try {
        const filepath = await generateFile(language, code);
        job = await new jobs({ language, filepath }).save();
        const jobId = job._id.toString();
        await addJobToQueue({ jobId, problemId, language, filepath });
        return res.status(201).json({ jobId });
    } catch (error) {
        return res.status(500).json({ success: false, err: JSON.stringify(error) });
    }
};

export const status = async (req: Request, res: Response): Promise<Response> => {
    try {
        const jobId = req.query.id as string;

        if (jobId === undefined) {
            return res.status(400).json({ success: false, error: 'missing id query param' });
        }

        const job_res = await jobs.findById(jobId);

        if (job_res === null) {
            return res.status(400).json({ success: false, error: 'couldnt find job' });
        }

        return res.status(200).json({ success: true, job_res });
    } catch (err) {
        console.log('error while getting status', err);
        return res.status(401).json({ success: false, error: `There was an error getting status: ${JSON.stringify(err)}` });
    }
};

