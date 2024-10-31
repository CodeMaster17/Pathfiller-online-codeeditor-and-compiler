import { Router } from 'express';
import { run_code, status } from '../controllers/code_controller';

const router = Router();

router.route('/run').get(run_code);
router.route('/status').get(status);

export default router;

