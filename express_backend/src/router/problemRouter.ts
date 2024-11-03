import { Router } from 'express';
import { addProblemWithTagsAndTestCases, getAllProblems, getProblemById } from '../controllers/problem_controller';

const router = Router();

router.route('/add').post(addProblemWithTagsAndTestCases);
router.route('/get/:id').get(getProblemById);
router.route('/all').get(getAllProblems);

export default router;

