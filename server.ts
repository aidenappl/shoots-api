import express from 'express';
const app = express();

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectToDatabase } from './db';

import dotenv from 'dotenv';
dotenv.config();

// Environment Checks
if (!process.env.DATABASE_URL && process.env.NODE_ENV == 'production') {
	console.error('Missing DATABASE_URL environment variable.');
	process.exit(1);
} else if (!process.env.ACCESS_TOKEN_SECRET) {
	console.error('Missing ACCESS_TOKEN_SECRET environment variable.');
	process.exit(1);
} else if (!process.env.REFRESH_TOKEN_SECRET) {
	console.error('Missing REFRESH_TOKEN_SECRET environment variable.');
	process.exit(1);
} else if (!process.env.SENDGRID_API_KEY) {
	console.error('Missing SENDGRID_API_KEY environment variable.');
	process.exit(1);
}

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Import routes
import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import tokenRoutes from './routes/token';
import groupRoutes from './routes/groups';
import screenTimeRoutes from './routes/screenTime';

// Use routes
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/token', tokenRoutes);
app.use('/groups', groupRoutes);
app.use('/screenTime', screenTimeRoutes);

// Define the port
const port = process.env.PORT || 3000;

// Start the server and connect to the database
const startServer = async () => {
	try {
		await connectToDatabase();
		app.listen(port, () => {
			console.log(`Shoots server is running on port ${port}`);
		});
	} catch (err) {
		console.error('Failed to start the server:', err);
		process.exit(1); // Exit process on failure
	}
};

startServer();
