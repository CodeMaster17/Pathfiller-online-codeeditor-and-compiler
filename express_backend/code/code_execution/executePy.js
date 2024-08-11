// we don't need an output file for this becuase python is interpreted langauge
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}
const executePy = (filepath, inputs) => {

  const jobId = path.basename(filepath).split(".")[0];

  // getting the output path where the ouput will be generated
  const outPath = path.join(outputPath, `${jobId}.out`);

  // creating input file path
  const inputFilePath = path.join(outputPath, `${jobId}.txt`);
  fs.writeFileSync(inputFilePath, inputs);
  return new Promise((resolve, reject) => {
    exec(
      `python3 ${filepath} < ${inputFilePath}`,
      (error, stdout, stderr) => {
        fs.unlinkSync(inputFilePath);

        if (error) {
          reject({ error, stderr });
        } else if (stderr) {
          reject(stderr);
        } else {
          resolve(stdout);
        }
      }
    );
  });
};

module.exports = {
  executePy,
};
