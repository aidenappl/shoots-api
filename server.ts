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

// Test DB connection
db.connect()
	.then(() => console.log('Connected to the database'))
	.catch((err: Error) => console.error('Error connecting to the database', err.stack));

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

// Start the server
app.listen(port, () => {
	console.log(`Shoots server is running on port ${port}`);
});
