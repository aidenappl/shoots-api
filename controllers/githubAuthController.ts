import { Request, Response } from 'express';
import Responder from '../middleware/responder';
import axios from 'axios';
import { Authentication, User } from '../models/model';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
import { setTokensAsCookies } from '../utils/jwtCookies';

/**
 * Github response interface
 */
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

/**
 * Get github user information
 * @param token Github access token
 * @returns Github user information
 * @throws Error if request fails
 * @example
 * const user = getGithubUser('githubToken');
 * console.log(user);
 * @description
 * This function sends a request to the Github API to get the user's information
 * It returns the user's information if the request is successful
 * It throws an error if the request fails
 * The user's information includes the user's name, email, and profile picture
 * The user's information is used to create a new user or update an existing user
 */
const getGithubUser = async (token: string): Promise<GithubResponse> => {
	const { data } = await axios.get('https://api.github.com/user', {
		headers: { Authorization: `token ${token}` },
	});

	return data;
};

/**
 * Github authentication controller
 * @param req Express request
 * @param res Express response
 * @returns void
 * @route /auth/github
 * @method POST
 * @example
 * 	/auth/github
 * 	{
 * 		"code": "githubCode"
 * 	}
 * @description
 * 	This controller is used to authenticate a user using GitHub OAuth2.0
 * 	Steps:
 * 	1. It receives a GitHub code from the request body
 * 	2. It sends a request to GitHub's OAuth2.0 API to get the user's information
 * 	3. It checks if the user exists in the database
 * 	4. If the user does not exist, it creates a new user and authentication strategy
 * 	5. If the user exists, it checks if the user has a github_id
 * 	6. If the user does not have a github_id, it updates the user's github_id
 * 	7. It generates an access token and a refresh token
 * 	8. It sets the tokens as cookies
 * 	9. It sends a success response with the user's information, access token, and refresh token
 * 	10. If an error occurs, it sends an error response
 */
const githubAuth = async (req: Request, res: Response) => {
	try {
		const { code } = req.body;
		if (!code) {
			return Responder.error(res, 'GitHub code is required', null, 400);
		}
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
