const Problem = require("../models/problem_model");
const Tag = require("../models/tag_model");
const TestCase = require("../models/test_case_model");

exports.addProblemWithTagsAndTestCases = async (req, res) => {
    try {
        const { testCases, tags = [], initialCode, ...problem } = req.body;
        const tagIds = [];
        for (const tag of tags) {

            if (!tag.name) {
                return res.status(400).json({ message: 'Tag name cannot be null or empty' });
            }

            let existingTag = await Tag.findOne({ name: tag.name });
            if (!existingTag) {
                const newTag = await Tag.create(tag);
                tagIds.push(newTag._id);
            } else {
                tagIds.push(existingTag._id);
            }
        }


        const testCaseIds = [];
        for (const testCase of testCases) {
            const newTestCase = await TestCase.create(testCase);
            testCaseIds.push(newTestCase._id);
        }

        problem.testCases = testCaseIds;
        problem.tags = tagIds;
        //
        problem.initialCode = initialCode;

        const newProblem = await Problem.create(problem);
        res.status(201).json({ newProblem, message: 'Problem added successfully' });
    } catch (err) {
        console.error('Error adding problem with tags and test cases:', err);
    }
}


// get the problem by id
exports.getProblemById = async (req, res) => {
    try {
        const { id } = req.params

        const problem = await Problem.findOne({ _id: id }).populate('testCases').populate('tags');

        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        res.status(200).json(problem);
        console.log('Problem found:', problem);
    } catch (err) {
        console.error('Error getting problem by id:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllProblems = async (req, res) => {
    try {
        const problems = await Problem.find()
            .populate('testCases')
            .populate('tags');

        res.status(200).json(problems);
        console.log('All problems retrieved:', problems);
    } catch (err) {
        console.error('Error getting all problems:', err);
        res.status(500).json({ message: 'Server error' });
    }
};