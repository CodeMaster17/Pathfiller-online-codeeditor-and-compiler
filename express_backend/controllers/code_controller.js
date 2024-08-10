const { generateFile } = require('../code/generateFile')
const jobs = require('../models/jobs');
const { addJobToQueue } = require('../code/job_queue');
exports.run_code = async (req, res) => {
    const { language = "cpp", code } = req.body;

    console.log(language, "Length:", code.length);

    if (code === undefined) {
        return res.status(400).json({ success: false, error: "Empty code body!" });
    }
    let job;
    try {
        const filepath = await generateFile(language, code);
        job = await new jobs({ language, filepath }).save();
        const jobId = job["_id"];
        addJobToQueue(jobId)
        res.status(201).json({ jobId });

    } catch (error) {
        return res.status(500).json({ success: false, err: JSON.stringify(err) })
    }
}

exports.status = async (req, res) => {
    try {
        const jobId = req.query.id;

        if (jobId === undefined) {
            return res
                .status(400)
                .json({ success: false, error: "missing id query param" });
        }

        const job_res = await jobs.findById(jobId);

        if (job_res === undefined) {
            return res.status(400).json({ success: false, error: "couldn't find job" });
        }

        return res.status(200).json({ success: true, job_res });
    } catch (err) {
        console.log("error while gettting status", err);
        res.status(401).json({ success: false, error: `There was error gettting status: ${JSON.stringify(err)}` })
    }
}