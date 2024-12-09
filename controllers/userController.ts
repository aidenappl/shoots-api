import { Request, Response } from 'express';
import { User } from '../models/model';
import Responder from '../middleware/responder';

/**
 * Get the current user
 * This is a protected route, so we can access the user's details from res.locals.user
 *
 * @param req Express Request
 * @param res Express Response
 * @returns void
 *
 * @example
 * getSelf(req, res);
 */
const getSelf = async (req: Request, res: Response) => {
	try {
		if (!res.locals.user) {
			return Responder.error(res, 'User not found', null, 404);
		}
		const user = await User.findByPk(res.locals.user.id);
		Responder.success(res, 'User fetched successfully', user);
	} catch (err) {
		console.log(err);
		Responder.error(res, 'An error occurred while fetching users', err);
	}
};

/**
 * Get user details by ID
 *
 * @param req Express Request
 * @param res Express Response
 * @returns void
 *
 * @example
 * getUserDetails(req, res);
 */
const getUserDetails = async (req: Request, res: Response) => {
	try {
		if (!req.params.id) {
			return Responder.error(res, 'User not found', null, 404);
		}
		const intID = parseInt(req.params.id);
		if (isNaN(intID)) {
			return Responder.error(res, 'Invalid user ID', null, 400);
		}
		const user = await User.findByPk(intID);
		if (!user) {
			return Responder.error(res, 'User not found', null, 404);
		}
		Responder.success(res, 'User fetched successfully', user);
	} catch (err) {
		console.log(err);
		Responder.error(res, 'An error occurred while fetching users', err);
	}
};

/**
 * Update the current user
 *
 * @param req Express Request
 * @param res Express Response
 * @returns void
 *
 * @example
 * updateUser(req, res);
 */
const updateUser = async (req: Request, res: Response) => {
	try {
		const changes: Partial<Models.User> = {};
		if (req.body.name) changes['name'] = req.body.name;
		if (req.body.profile_picture) changes['profile_picture'] = req.body.profile_picture;

		if (Object.keys(changes).length === 0) {
			return Responder.error(res, 'No changes provided', null, 400);
		}

		const updatedUser = await User.update(changes, {
			where: { id: res.locals.user.id },
			returning: true,
		});

		if (!updatedUser[1][0]) {
			return Responder.error(res, 'User not found', null, 404);
		}

		const user = updatedUser[1][0];

		Responder.success(res, 'User updated successfully', user);
	} catch (err) {
		console.log(err);
		Responder.error(res, 'An error occurred while fetching users', err);
	}
};

export { getSelf, getUserDetails, updateUser };
