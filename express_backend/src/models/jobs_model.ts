import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
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

export default mongoose.model('job', JobSchema);

