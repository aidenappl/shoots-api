import express from 'express';
import { enterScreenTime, getSelfScreenTime } from '../controllers/screenTimeController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// [POST] create screen time entry
router.post('/', authenticate, enterScreenTime);

// [GET] get screen time entry for self
router.get('/', authenticate, getSelfScreenTime);

export default router;
