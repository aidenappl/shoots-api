import express from 'express';
import { Request, Response } from 'express';
const router = express.Router();
import db from '../db';
import Responder from '../middleware/responder';

// [GET] Get current user
router.get('/', async (req: Request, res: Response) => {
	try {
		const result = await db.query('SELECT * FROM users');
		Responder.success(res, 'Users fetched successfully', result);
	} catch (err) {
		console.log(err);
		Responder.error(res, 'An error occurred while fetching users', err);
	}
});

// [GET] Get user by ID
router.get('/:id', (req: Request, res: Response) => {
	Responder.success(res, 'User fetched successfully', req.params.id);
});

// [PUT] Update user by ID
router.put('/:id', (req: Request, res: Response) => {
	Responder.success(res, 'User updated successfully', req.body);
});

export default router;
