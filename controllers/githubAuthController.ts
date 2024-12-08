import { Request, Response } from 'express';
import Responder from '../middleware/responder';

const githubAuth = async (req: Request, res: Response) => {
	try {
		Responder.success(res, 'Google login successful', req.body);
	} catch (err) {
		console.log(err);
		Responder.error(res, 'An error occurred while logging in with Google', err);
	}
};

export { githubAuth };
