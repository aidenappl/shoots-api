import express from 'express'
import { enterScreenTime } from '../controllers/screenTimeController'
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// [POST] create screen time entry
router.post('/', authenticate, enterScreenTime);

export default router