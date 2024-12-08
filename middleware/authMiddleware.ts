import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt'; // Adjust the path as needed
import Responder from './responder';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	const authCookie = req.cookies.accessToken;

	if ((!authHeader || !authHeader.startsWith('Bearer ')) && !authCookie) {
		return Responder.error(res, 'No token provided', null, 401);
	}

	let token = '';
	if (authCookie) {
		token = authCookie;
	} else {
		if (authHeader !== `Bearer ${authCookie}`) {
			return Responder.error(res, 'Invalid token', null, 401);
		}
		token = authHeader.split(' ')[1];
	}

	try {
		const user = verifyAccessToken(token);
		if (!user) {
			return Responder.error(res, 'Invalid token', null, 401);
		}

		// Attach the user to the request object
		res.locals = { user };
		next();
	} catch (error) {
		console.error('Error verifying token:', error);
		Responder.error(res, 'Invalid token', null, 401);
	}
};
