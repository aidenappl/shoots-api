import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { setTokensAsCookies } from '../utils/jwtCookies';
import Responder from '../middleware/responder';
import { User } from '../models/model';
import { Request, Response } from 'express';

const refreshToken = async (req: Request, res: Response) => {
	let { refreshToken } = req.cookies;
	if (!refreshToken && !req.body.refreshToken)
		return Responder.error(res, 'No refresh token provided', null, 401);

	if (!refreshToken && req.body.refreshToken) {
		refreshToken = req.body.refreshToken;
	}
	try {
		const decoded = verifyRefreshToken(refreshToken);
		if (decoded) {
			const user = await User.findByPk(decoded.id);
			if (!user) {
				Responder.error(res, 'User not found', null, 404);
				return;
			}

			const newAccessToken = generateAccessToken(user);
			const newRefreshToken = generateRefreshToken(user);

			setTokensAsCookies(
				{
					accessToken: newAccessToken,
					refreshToken: newRefreshToken,
				},
				res,
			);

			Responder.success(res, 'Token refreshed successfully', {
				accessToken: newAccessToken,
				refreshToken: newRefreshToken,
			});
		} else {
			Responder.error(res, 'Invalid refresh token', null, 401);
		}
	} catch (error) {
		console.error('Error refreshing token:', error);
		Responder.error(res, 'Invalid refresh token', null, 401);
	}
};

export { refreshToken };
