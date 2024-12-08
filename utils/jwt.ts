import jwt, { JwtPayload } from 'jsonwebtoken';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || '';
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || '';

// Function to generate access token
export const generateAccessToken = (user: Models.User) => {
	const expiresIn = '15m'; // Access token expiration time
	const payload = {
		id: user.id,
		email: user.email,
		type: 'access',
	};

	return jwt.sign(payload, accessTokenSecret, { expiresIn });
};

// Function to generate refresh token
export const generateRefreshToken = (user: Models.User) => {
	const expiresIn = '7d'; // Refresh token expiration time
	const payload = {
		id: user.id,
		email: user.email,
		type: 'refresh',
	};

	return jwt.sign(payload, refreshTokenSecret, { expiresIn });
};

// Function to verify access token
export const verifyAccessToken = (token: string): JwtPayload | null => {
	try {
		const tokenVery = jwt.verify(token, accessTokenSecret);
		return tokenVery as JwtPayload;
	} catch (error) {
		console.log('Error verifying access token:', error);
		throw new Error('Invalid access token');
	}
};

// Function to verify refresh token
export const verifyRefreshToken = (token: string): JwtPayload | null => {
	try {
		const tokenVery = jwt.verify(token, refreshTokenSecret);
		return tokenVery as JwtPayload;
	} catch (error) {
		console.log('Error verifying refresh token:', error);
		throw new Error('Invalid access token');
	}
};
