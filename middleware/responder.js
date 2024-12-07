// This middleware is used to send standardized responses to the client.
class Responder {
  /**
   * Send a standardized success response
   * @param {object} res - Express response object
   * @param {string} message - Descriptive success message
   * @param {any} data - Response data
   * @param {number} [statusCode=200] - HTTP status code
   */
  static success(res, message, data = null, statusCode = 200) {
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
  static error(res, message, error = null, statusCode = 500) {
    res.status(statusCode).json({
      message,
      error,
      success: false,
    });
  }
}

module.exports = Responder;
