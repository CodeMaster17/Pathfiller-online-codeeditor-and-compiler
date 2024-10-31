import { Router } from 'express';
import { run_code_playground, status_playground } from '../controllers/code_playground_controller';

const router = Router();

router.route('/run').post(run_code_playground);
router.route('/status').get(status_playground);

export default router;

