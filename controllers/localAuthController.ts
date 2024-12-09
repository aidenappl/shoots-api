import { Request, Response } from 'express';
import Responder from '../middleware/responder';
import bcrypt from 'bcrypt';
import { Authentication, User } from '../models/model';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
import { setTokensAsCookies } from '../utils/jwtCookies';

/**
 * Register request interface
 */
interface RegisterRequest {
	name: string;
	email: string;
	password: string;
}

/**
 * Register a new user
 * @param req Express request
 * @param res Express response
 * @returns void
 * @route /auth/register
 * @method POST
 * @example
 * 	/auth/register
 * 	{
 * 		"name": "John Doe",
 * 		"email": "john@description.com",
 * 		"password": "password"
 * 	}
 * @description
 * This controller is used to register a new user
 * 	Steps:
 * 1. It receives the user's name, email, and password from the request body
 * 2. It checks if the user already exists
 * 3. It hashes the password
 * 4. It creates a new user and authentication strategy
 * 5. It generates an access token and a refresh token
 * 6. It sets the tokens as cookies
 * 7. It sends a success response with the user's information, access token, and refresh token
 * 8. If an error occurs, it sends an error response
 */

const registerUser = async (req: Request, res: Response) => {
	const { name, email, password }: RegisterRequest = req.body;

	// Check if the required fields are provided
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

		const accessToken = generateAccessToken(newUser);
		const refreshToken = generateRefreshToken(newUser);

		setTokensAsCookies(
			{
				accessToken,
				refreshToken,
			},
			res,
		);

		Responder.success(res, 'User registered successfully', {
			user: newUser.dataValues,
			accessToken,
			refreshToken,
		});
	} catch (err) {
		console.log(err);
		Responder.error(res, 'An error occurred while registering user', err);
	}
};

/**
 * Login request interface
 */
interface LoginRequest {
	email: string;
	password: string;
}

/**
 * Login a user
 * @param req Express request
 * @param res Express response
 * @returns void
 * @route /auth/login
 * @method POST
 * @example
 * 	/auth/login
 * 	{
 * 		"email": "test@test.com"
 * 		"password": "password"
 * 	}
 * @description
 * 	This controller is used to login a user
 * 	Steps:
 * 	1. It receives the user's email and password from the request body
 * 	2. It checks if the user exists
 * 	3. It checks if the password is correct
 * 	4. It generates an access token and a refresh token
 * 	5. It sets the tokens as cookies
 * 	6. It sends a success response with the user's information, access token, and refresh token
 * 	7. If an error occurs, it sends an error response
 */

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
					const accessToken = generateAccessToken(user);
					const refreshToken = generateRefreshToken(user);

					setTokensAsCookies(
						{
							accessToken,
							refreshToken,
						},
						res,
					);

					Responder.success(res, 'User logged in successfully', {
						user: user.dataValues,
						accessToken,
						refreshToken,
					});
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

/**
 * Logout a user
 * @param req Express request
 * @param res Express response
 * @returns void
 * @route /auth/logout
 * @method DELETE
 * @description
 * 	This controller is used to logout a user
 * 	Steps:
 * 	1. It clears the accessToken and refreshToken cookies
 * 	2. It sends a success response
 */
const logoutUser = async (req: Request, res: Response) => {
	// Clear the accessToken and refreshToken cookies
	res.cookie('accessToken', '', { expires: new Date(0) });
	res.cookie('refreshToken', '', { expires: new Date(0) });

	Responder.success(res, 'User logged out successfully', null);
};

export { registerUser, loginUser, logoutUser };
