const mongoose = require('mongoose');
const { Schema } = mongoose;


const TestCase = require('./test_case_model');
const Tag = require('./tag_model');
const problemSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    constraints: {
        type: String
    },
    testCases: [{
        type: Schema.Types.ObjectId,
        ref: 'TestCase'
    }],
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;
