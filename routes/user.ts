import express from 'express';
import { Request, Response } from 'express';
const router = express.Router();
import Responder from '../middleware/responder';
import { authenticate } from '../middleware/authMiddleware';
import { getSelf } from '../controllers/userController';

// [GET] Get current user
router.get('/', authenticate, getSelf);

// [GET] Get user by ID
router.get('/:id', (req: Request, res: Response) => {
	Responder.success(res, 'User fetched successfully', req.params.id);
});

// [PUT] Update user by ID
router.put('/:id', (req: Request, res: Response) => {
	Responder.success(res, 'User updated successfully', req.body);
});

export default router;
