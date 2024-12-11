"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const dirCodes = path_1.default.join(__dirname, 'generated_codes');
if (!fs_1.default.existsSync(dirCodes)) {
    fs_1.default.mkdirSync(dirCodes, { recursive: true });
}
const generateFile = (format, content) => {
    const jobId = (0, uuid_1.v4)();
    const filename = `${jobId}.${format}`;
    const filepath = path_1.default.join(dirCodes, filename);
    fs_1.default.writeFileSync(filepath, content);
    return filepath;
};
exports.generateFile = generateFile;
//# sourceMappingURL=generateFile.js.map