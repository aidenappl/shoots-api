import express, { Request, Response } from 'express';
import Responder from '../middleware/responder';
const router = express.Router();

router.post('/google', async (req: Request, res: Response) => {
	Responder.success(res, 'Google login successful', req.body);
});

router.post('/github', async (req: Request, res: Response) => {
	Responder.success(res, 'Github hit successful', req.body);
});

router.post('/login', async (req: Request, res: Response) => {
	Responder.success(res, 'Local login hit successful', req.body);
});

router.post('/register', async (req: Request, res: Response) => {
	Responder.success(res, 'Register hit successful', req.body);
});

export default router;
