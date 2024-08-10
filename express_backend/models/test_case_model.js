const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for a test case
const testCaseSchema = new Schema({
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const TestCase = mongoose.model('TestCase', testCaseSchema);

module.exports = TestCase;