import express, { Request, Response } from 'express';
import Responder from '../middleware/responder';
const router = express.Router();

// [GET] associated groups
router.get('/', async (req: Request, res: Response) => {
	try {
		Responder.success(res, 'Groups fetched successfully', null);
	} catch (err) {
		console.log(err);
		Responder.error(res, 'An error occurred while fetching groups', err);
	}
});

// [GET] specific group
router.get('/:id', (req: Request, res: Response) => {
	Responder.success(res, 'Group fetched successfully', req.params.id);
});

// [POST] create group
router.post('/', async (req: Request, res: Response) => {
	Responder.success(res, 'Group created successfully', req.body);
});

// [PUT] handle user invite to group
router.put('/:id/invite', (req: Request, res: Response) => {
	Responder.success(res, 'User invited to group successfully', req.body);
});

// [DELETE] deletes group
router.delete('/:id', (req: Request, res: Response) => {
	Responder.success(res, 'Group deleted successfully', req.params.id);
});

export default router;
