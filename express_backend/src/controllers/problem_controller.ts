import { NextFunction, Request, Response } from 'express';
import Problem from '../models/problem_model';
import Tag from '../models/tag_model';
import TestCase from '../models/test_case_model';
import httpResponse from '../utils/httpResponse';
import { responseMessage } from '../constants/responseMessage';
import httpError from '../utils/httpError';

interface TagInterface {
    name: string;
    _id?: string;
}

interface TestCaseInterface {
    input: string;
    output: string;
    _id?: string;
}

interface ProblemInterface {
    title: string;
    description: string;
    tags?: string[];
    testCases?: string[];
    initialCode?: string;
}

export const addProblemWithTagsAndTestCases = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {
            testCases = [],
            tags = [],
            initialCode,
            ...problemData
        } = req.body as {
            testCases: TestCaseInterface[];
            tags: TagInterface[];
            initialCode: string;
            [key: string]: any;
        };

        const tagIds: string[] = [];
        for (const tag of tags) {
            if (!tag.name) {
                return res.status(400).json({ message: 'Tag name cannot be null or empty' });
            }

            let existingTag = await Tag.findOne({ name: tag.name });
            if (!existingTag) {
                const newTag = await Tag.create(tag);
                tagIds.push(newTag._id.toString());
            } else {
                tagIds.push(existingTag._id.toString());
            }
        }

        const testCaseIds: string[] = [];
        for (const testCase of testCases) {
            const newTestCase = await TestCase.create(testCase);
            testCaseIds.push(newTestCase._id.toString());
        }

        const problem: ProblemInterface = {
            title: problemData.title,
            description: problemData.description,
            tags: tagIds,
            testCases: testCaseIds,
            initialCode
        };

        const newProblem = await Problem.create(problem);
        return res.status(201).json({ newProblem, message: 'Problem added successfully' });
    } catch (err) {
        return res.status(500).json({ success: false, error: `There was an error adding the problem: ${JSON.stringify(err)}` });
    }
};

export const getProblemById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        const problem = await Problem.findOne({ _id: id }).populate('testCases').populate('tags');

        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        return res.status(200).json(problem);

    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
};

export const getAllProblems = async (_: Request, res: Response, next: NextFunction) => {
    try {
        const problems = await Problem.find().populate('testCases').populate('tags');
        httpResponse(_, res, 200, responseMessage.SUCCESS, problems);
    } catch (err) {
        httpError(next, err, _, 500);
    }
};

