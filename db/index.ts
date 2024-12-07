import { Pool, QueryResult } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

export type QueryParams = unknown[]; // Adjust type if needed for stricter typing
export type QueryResultRow = { [key: string]: unknown }; // Adjust for stricter row typing

const db = {
	/**
	 * Perform a query on the database.
	 * @param text - SQL query string
	 * @param params - Query parameters
	 * @returns Promise resolving to query result rows
	 */
	query: async <T extends QueryResultRow = QueryResultRow>(
		text: string,
		params?: QueryParams,
	): Promise<T[]> => {
		const result: QueryResult<T> = await pool.query(text, params);
		return result.rows;
	},

	/**
	 * Get a client connection from the pool.
	 * @returns Promise resolving to a PoolClient
	 */
	connect: () => pool.connect(),
};

export default db;
