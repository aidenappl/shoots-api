import { Request, Response } from 'express';
import { User } from '../models/model';
import Responder from '../middleware/responder';

const getSelf = async (req: Request, res: Response) => {
	try {
		const user = await User.findByPk(res.locals.user.id);
		Responder.success(res, 'User fetched successfully', user);
	} catch (err) {
		console.log(err);
		Responder.error(res, 'An error occurred while fetching users', err);
	}
};

export { getSelf };
