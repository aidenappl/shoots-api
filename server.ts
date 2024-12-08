import express from 'express';
const app = express();

import bodyParser from 'body-parser';
import cors from 'cors';
import { connectToDatabase } from './db';

import dotenv from 'dotenv';
dotenv.config();

// Environment Checks
if (!process.env.DATABASE_URL) {
	console.error('Missing DATABASE_URL environment variable.');
	process.exit(1);
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import routes
import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import tokenRoutes from './routes/token';

// Use routes
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/token', tokenRoutes);

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
