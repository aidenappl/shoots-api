import { Request, Response } from 'express';
import Responder from '../middleware/responder';

const registerUser = async (req: Request, res: Response) => {
	try {
		Responder.success(res, 'User registered successfully', req.body);
	} catch (err) {
		console.log(err);
		Responder.error(res, 'An error occurred while registering user', err);
	}
};

const loginUser = async (req: Request, res: Response) => {
	try {
		Responder.success(res, 'User logged in successfully', req.body);
	} catch (err) {
		console.log(err);
		Responder.error(res, 'An error occurred while logging in user', err);
	}
};

const logoutUser = async (req: Request, res: Response) => {
	try {
		Responder.success(res, 'User logged out successfully', null);
	} catch (err) {
		console.log(err);
		Responder.error(res, 'An error occurred while logging out user', err);
	}
};

export { registerUser, loginUser, logoutUser };
