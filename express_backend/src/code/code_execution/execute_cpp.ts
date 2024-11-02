import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const outputPath = path.join(__dirname, 'outputs');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

// Define the function to execute C++ code
const executeCpp = (filepath: string, inputs: string): Promise<string> => {
    // Getting the file name
    const jobId = path.basename(filepath).split('.')[0];

    // Getting the output path where the output will be generated
    const outPath = path.join(outputPath, `${jobId}.out`);

    // Creating input file path
    const inputFilePath = path.join(outputPath, `${jobId}.txt`);
    fs.writeFileSync(inputFilePath, inputs);

    return new Promise((resolve, reject) => {
        exec(`g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out < ${inputFilePath}`, (error, stdout, stderr) => {
            if (error) {
                return reject({ error, stderr });
            }
            if (stderr) {
                return reject(stderr);
            }
            resolve(stdout);
        });
    });
};

export { executeCpp };

