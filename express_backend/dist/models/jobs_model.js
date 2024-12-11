"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const JobSchema = new mongoose_1.default.Schema({
    language: {
        type: String,
        required: true,
        enum: ['cpp', 'py']
    },
    filepath: {
        type: String,
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    },
    startedAt: {
        type: Date
    },
    completedAt: {
        type: Date
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'success', 'error']
    },
    output: {
        type: String
    },
    mismatches: [
        {
            input: { type: String, required: true },
            expectedOutput: { type: String, required: true },
            actualOutput: { type: String, required: true }
        }
    ]
});
exports.default = mongoose_1.default.model('job', JobSchema);
//# sourceMappingURL=jobs_model.js.map