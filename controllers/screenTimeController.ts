import { Request, Response } from 'express';
import Responder from '../middleware/responder';
import { ScreenTime } from '../models/model';
import { Op } from 'sequelize';
import { getLastMonday } from '../utils/getMonday';

const enterScreenTime = async (req: Request, res: Response) => {
	try {
		const { user } = res.locals;
		const { screen_time } = req.body;
		if (!screen_time) {
			return Responder.error(res, 'Must provide screen time value', null, 400);
		}
		const screenTimeAmount = parseInt(screen_time);
		if (isNaN(screenTimeAmount)) {
			return Responder.error(res, 'Screen time must be an integer', null, 422);
		}

		const screenTime = await ScreenTime.create({
			user_id: user.id,
			submitted_time: screenTimeAmount,
		});

		return Responder.success(res, 'Screen time submitted successfully', screenTime);
	} catch (err) {
		console.log(err);
		Responder.error(res, 'An error occurred while submitting screen time', err);
	}
};

const getSelfScreenTime = async (req: Request, res: Response) => {
	try {
		const { user } = res.locals;
		const screenTime = await ScreenTime.findOne({
			where: {
				user_id: user.id,
				inserted_at: {
					[Op.gte]: getLastMonday(),
				},
			},
		});
		if (!screenTime) {
			return Responder.success(res, "User has not entered this week's screen time yet", null);
		}
		return Responder.success(res, 'Screen time fetched successfully', screenTime);
	} catch (err) {
		console.log(err);
		Responder.error(res, 'An error occurred while fetching screen time', err);
	}
};

export { enterScreenTime, getSelfScreenTime };
