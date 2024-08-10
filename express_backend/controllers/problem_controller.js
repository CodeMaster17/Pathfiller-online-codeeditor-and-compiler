
const Problem = require("../models/problem_model");
const Tag = require("../models/tag_model");
const TestCase = require("../models/test_case_model");

exports.addProblemWithTagsAndTestCases = async (req, res) => {
    try {
        const { testCases, tags, ...problem } = req.body;

        const tagIds = [];
        for (const tag of tags) {
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

        const newProblem = await Problem.create(problem);
        res.status(201).json({ newProblem, message: 'Problem added successfully' });
        console.log('Problem added:', newProblem);
    } catch (err) {
        console.error('Error adding problem with tags and test cases:', err);
    }
}


// get the problem by id
exports.getProblemById = async (req, res) => {
    try {
        const { id } = req.params;


        const problem = await Problem.findOne({ id: id }).populate('testCases').populate('tags');

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
