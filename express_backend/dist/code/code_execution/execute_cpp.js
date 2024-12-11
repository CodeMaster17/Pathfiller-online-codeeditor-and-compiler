"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCpp = void 0;
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const outputPath = path_1.default.join(__dirname, 'outputs');
if (!fs_1.default.existsSync(outputPath)) {
    fs_1.default.mkdirSync(outputPath, { recursive: true });
}
const executeCpp = (filepath, inputs) => {
    const jobId = path_1.default.basename(filepath).split('.')[0];
    const outPath = path_1.default.join(outputPath, `${jobId}.out`);
    const inputFilePath = path_1.default.join(outputPath, `${jobId}.txt`);
    fs_1.default.writeFileSync(inputFilePath, inputs);
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(`g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out < ${inputFilePath}`, (error, stdout, stderr) => {
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
exports.executeCpp = executeCpp;
//# sourceMappingURL=execute_cpp.js.map