import express, { Request, Response } from 'express';
import Responder from '../middleware/responder';
const router = express.Router();

router.post('/refresh', async (req: Request, res: Response) => {
	Responder.success(res, 'Token refreshed successfully', req.body);
});

export default router;
