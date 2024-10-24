const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, inputs) => {
    // getting the file name
    const jobId = path.basename(filepath).split(".")[0];

    // getting the output path where the ouput will be generated
    const outPath = path.join(outputPath, `${jobId}.out`);

    // creating input file path
    const inputFilePath = path.join(outputPath, `${jobId}.txt`);
    fs.writeFileSync(inputFilePath, inputs);

    return new Promise((resolve, reject) => {
        exec(
            `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out < ${inputFilePath}`,
            (error, stdout, stderr) => {
                error && reject({ error, stderr });
                stderr && reject(stderr);
                resolve(stdout);
            }
        );
    });
};

module.exports = {
    executeCpp,
};
