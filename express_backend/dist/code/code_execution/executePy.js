"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executePy = void 0;
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const outputPath = path_1.default.join(__dirname, 'outputs');
if (!fs_1.default.existsSync(outputPath)) {
    fs_1.default.mkdirSync(outputPath, { recursive: true });
}
const executePy = (filepath, inputs) => {
    const jobId = path_1.default.basename(filepath).split('.')[0];
    const inputFilePath = path_1.default.join(outputPath, `${jobId}.txt`);
    fs_1.default.writeFileSync(inputFilePath, inputs);
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(`python3 ${filepath} < ${inputFilePath}`, (error, stdout, stderr) => {
            fs_1.default.unlinkSync(inputFilePath);
            if (error) {
                reject({ error, stderr });
            }
            else if (stderr) {
                reject(stderr);
            }
            else {
                resolve(stdout);
            }
        });
    });
};
exports.executePy = executePy;
//# sourceMappingURL=executePy.js.map