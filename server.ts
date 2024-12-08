import express from 'express';
const app = express();

import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db';

import dotenv from 'dotenv';
dotenv.config();

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
		await db.connect();
		app.listen(port, () => {
			console.log(`Shoots server is running on port ${port}`);
		});
	} catch (err) {
		console.error('Failed to start the server:', err);
		process.exit(1); // Exit process on failure
	}
};

startServer();
