const { HTTP_STATUS } = require('../const');

module.exports = function errorSender(request, response, error) {
  const statusCode = error.status || HTTP_STATUS.UNEXPECTED_ERROR;
  const code = error.code || 'UNEXPECTED_ERROR';
  const message = error.message || 'Occur Unexpected Error';
  console.error(error);
  response.status(statusCode).json({
    code,
    message,
    rows: [],
  });
};
