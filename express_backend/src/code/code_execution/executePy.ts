import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const outputPath = path.join(__dirname, 'outputs');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

// Define the function to execute Python code
const executePy = (filepath: string, inputs: string): Promise<string> => {
    const jobId = path.basename(filepath).split('.')[0];

    // Creating input file path
    const inputFilePath = path.join(outputPath, `${jobId}.txt`);
    fs.writeFileSync(inputFilePath, inputs);

    return new Promise((resolve, reject) => {
        exec(`python3 ${filepath} < ${inputFilePath}`, (error, stdout, stderr) => {
            fs.unlinkSync(inputFilePath); // Remove input file after execution

            if (error) {
                reject({ error, stderr });
            } else if (stderr) {
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });
    });
};

export { executePy };

