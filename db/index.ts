import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL || '', {
	dialect: 'postgres',
	logging: false, // Disable SQL query logging
	dialectOptions: {
		ssl:
			process.env.NODE_ENV === 'production' ? { require: true, rejectUnauthorized: false } : false,
	},
});

const connectToDatabase = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connected to the database');
	} catch (err: Error | unknown) {
		console.error('Error connecting to the database', err);
		process.exit(1); // Exit the application if the connection fails
	}
};

export { sequelize, connectToDatabase };
