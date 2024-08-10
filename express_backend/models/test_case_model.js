const mongoose = require('mongoose');
const { Schema } = mongoose;

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