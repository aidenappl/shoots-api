import { Response } from 'express';

interface TokenReq {
	accessToken: string;
	refreshToken: string;
}

export const setTokensAsCookies = (req: TokenReq, res: Response) => {
	const { accessToken, refreshToken } = req;
	if (accessToken && refreshToken) {
		res.cookie('accessToken', accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			expires: new Date(Date.now() + 15 * 60 * 1000),
		}); // 15 minutes
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		}); // 7 days
	}
};
