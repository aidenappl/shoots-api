import { Request, Response } from 'express';
import Responder from '../middleware/responder';
import axios from 'axios';
import { Authentication, User } from '../models/model';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
import { setTokensAsCookies } from '../utils/jwtCookies';

interface GithubResponse {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	user_view_type: string;
	site_admin: boolean;
	name: string;
	company: string;
	blog: string;
	location: string;
	email: string;
	hireable: boolean;
	bio: string;
	twitter_username: string;
	notification_email: string;
	public_repos: number;
	public_gists: number;
	followers: number;
	following: number;
	created_at: string;
	updated_at: string;
}

const getGithubUser = async (token: string): Promise<GithubResponse> => {
	const { data } = await axios.get('https://api.github.com/user', {
		headers: { Authorization: `token ${token}` },
	});

	return data;
};

const githubAuth = async (req: Request, res: Response) => {
	try {
		const { code } = req.body;
		const { data: tokenData } = await axios.post(
			'https://github.com/login/oauth/access_token',
			{
				client_id: process.env.GH_CLIENT_ID,
				client_secret: process.env.GH_CLIENT_SECRET,
				code,
			},
			{
				headers: { Accept: 'application/json' },
			},
		);

		if (!tokenData.access_token) {
			return Responder.error(res, 'GitHub login failed', null, 400);
		}

		const ghUser = await getGithubUser(tokenData.access_token);
		const user = await User.findOne({ where: { email: ghUser.email } });

		if (!user) {
			const newUser = new User({
				email: ghUser.email,
				name: ghUser.name,
				profile_picture: ghUser.avatar_url,
			});
			await newUser.save();

			const newAuth = new Authentication({
				userId: newUser.id,
				github_id: ghUser.id.toString(),
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

			Responder.success(res, 'Successful github registration', {
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

			// check if user has githubId
			if (!strats.github_id) {
				// update user's githubId
				strats.github_id = ghUser.id.toString();
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

			Responder.success(res, 'Successful github login', {
				user: user.dataValues,
				accessToken,
				refreshToken,
			});
		}
	} catch (error) {
		Responder.error(res, 'GitHub login failed', error, 500);
	}
};

export { githubAuth };
