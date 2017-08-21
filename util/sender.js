const _ = require('lodash');
const { HTTP_STATUS } = require('../const');

module.exports = function sender(request, response, result) {
  const rows = result || [];
  const statusCode = rows.length === 0 ? HTTP_STATUS.NO_CONTENTS : HTTP_STATUS.SUCCESS;
  response.status(statusCode).json({
    code: response.code || _.findKey(HTTP_STATUS, status => status === statusCode),
    message: response.message || _.findKey(HTTP_STATUS, status => status === statusCode),
    rows,
  });
};
