import mongoose from 'mongoose';
const { Schema } = mongoose;

const testCaseSchema = new Schema(
    {
        input: {
            type: String,
            required: true
        },
        output: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('TestCase', testCaseSchema);

