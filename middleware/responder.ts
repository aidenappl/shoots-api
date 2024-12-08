import { Response } from 'express';

// This middleware is used to send standardized responses to the client.
class Responder {
	/**
	 * Send a standardized success response
	 * @param {object} res - Express response object
	 * @param {string} message - Descriptive success message
	 * @param {any} data - Response data
	 * @param {number} [statusCode=200] - HTTP status code
	 */
	static success(res: Response, message: string, data: unknown = null, statusCode: number = 200) {
		message = message.toLowerCase();
		res.status(statusCode).json({
			message,
			data,
			success: true,
		});
	}

	/**
	 * Send a standardized error response
	 * @param {object} res - Express response object
	 * @param {string} message - Descriptive error message
	 * @param {any} error - Additional error information
	 * @param {number} [statusCode=500] - HTTP status code
	 */
	static error(res: Response, message: string, error: unknown = null, statusCode: number = 500) {
		message = message.toLowerCase();
		res.status(statusCode).json({
			message,
			error,
			success: false,
		});
	}
}

export default Responder;
