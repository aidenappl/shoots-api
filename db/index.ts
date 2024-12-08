import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const sequelize = isProduction
	? new Sequelize(process.env.DATABASE_URL || '', {
			dialect: 'postgres',
			logging: false,
			dialectOptions: {
				ssl: {
					require: true,
					rejectUnauthorized: false,
				},
			},
		})
	: new Sequelize({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			logging: false,
		});

const connectToDatabase = async (): Promise<void> => {
	try {
		await sequelize.authenticate();
		console.log('Connected to the database');
	} catch (err) {
		console.error('Error connecting to the database:', err);
		process.exit(1);
	}
};

export { sequelize, connectToDatabase };
