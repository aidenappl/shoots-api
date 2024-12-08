import { Request, Response } from 'express';
import Responder from '../middleware/responder';
import { Authentication, User } from '../models/model';
import { setTokensAsCookies } from '../utils/jwtCookies';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';

interface GoogleResponse {
	id: string;
	email: string;
	verified_email: boolean;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
}

const googleAuth = async (req: Request, res: Response) => {
	const { googleToken } = req.body;
	if (!googleToken) {
		Responder.error(res, 'Google token is required', null, 400);
		return;
	}

	try {
		const googleResponse = await fetch('https://www.googleapis.com/oauthv2/v1/userInfo?alt=json', {
			headers: {
				Authorization: `Bearer ${googleToken}`,
				Accept: 'application/json',
				ContentType: 'application/json',
			},
		});

		if (googleResponse.status !== 200) {
			Responder.error(res, 'Google login failed', null, 400);
			return;
		}
		const googleJson = (await googleResponse.json()) as GoogleResponse;

		const user = await User.findOne({ where: { email: googleJson.email } });
		if (!user) {
			const newUser = new User({
				email: googleJson.email,
				name: googleJson.name,
				profile_picture: googleJson.picture,
			});
			await newUser.save();

			const newAuth = new Authentication({
				userId: newUser.id,
				google_id: googleJson.id,
			});
			await newAuth.save();

			const accessToken = generateAccessToken(newUser);
			const refreshToken = generateRefreshToken(newUser);

			setTokensAsCookies(
				{
					accessToken,
					refreshToken,
				},
				res,
			);

			Responder.success(res, 'Successful google registration', {
				user: newUser.dataValues,
				accessToken,
				refreshToken,
			});
		} else {
			// get user authentication strategies
			const strats = await Authentication.findOne({ where: { userId: user.id } });
			if (!strats) {
				Responder.error(res, 'User authentication strategies not found', null, 400);
				return;
			}

			// check if user has googleId
			if (!strats.google_id) {
				// update user's googleId
				strats.google_id = googleJson.id;
				await strats.save();
			}

			const accessToken = generateAccessToken(user);
			const refreshToken = generateRefreshToken(user);

			setTokensAsCookies(
				{
					accessToken,
					refreshToken,
				},
				res,
			);

			Responder.success(res, 'Successful google login', {
				user: user.dataValues,
				accessToken,
				refreshToken,
			});
		}
	} catch (err) {
		console.log(err);
		Responder.error(res, 'An error occurred while logging in with Google', err);
	}
};

export { googleAuth };
