import { Request, Response } from 'express';
import Responder from '../middleware/responder';
import bcrypt from 'bcrypt';
import { Authentication, User } from '../models/model';

interface RegisterRequest {
	name: string;
	email: string;
	password: string;
}

const registerUser = async (req: Request, res: Response) => {
	const { name, email, password }: RegisterRequest = req.body;

	if (!name || !email || !password) {
		Responder.error(res, 'Name, email, and password are required', null, 422);
		return;
	}

	try {
		// Check if the user already exists
		const user = await User.findOne({ where: { email } });
		if (user) {
			Responder.error(res, 'User already exists', null, 409);
			return;
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the user
		const newUser = await User.create({ name, email });
		await Authentication.create({ user_id: newUser.id, password: hashedPassword });

		Responder.success(res, 'User registered successfully', newUser);
	} catch (err) {
		console.log(err);
		Responder.error(res, 'An error occurred while registering user', err);
	}
};

interface LoginRequest {
	email: string;
	password: string;
}

const loginUser = async (req: Request, res: Response) => {
	const { email, password }: LoginRequest = req.body;

	if (!email || !password) {
		Responder.error(res, 'Email and password are required', null, 422);
		return;
	}

	try {
		// Check if the user exists
		const user = await User.findOne({ where: { email } });
		if (user) {
			// Check if the password is correct
			const strats = await Authentication.findOne({ where: { user_id: user.id } });
			if (strats && strats.password) {
				const match = await bcrypt.compare(password, strats.password);
				if (match) {
					Responder.success(res, 'User logged in successfully', user);
				} else {
					Responder.error(res, 'Invalid email or password', null, 401);
				}
			} else {
				Responder.error(res, 'Invalid strategy', null, 401);
			}
		} else {
			Responder.error(res, 'User not found', null, 404);
		}
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
