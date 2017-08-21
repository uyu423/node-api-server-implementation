const { HTTP_STATUS } = require('../../const');
const HttpError = require('../../HttpError');

module.exports = function getHell() {
  throw new HttpError({
    status: HTTP_STATUS.NOT_FOUND,
    code: 'GET_HELL_EXCEPTION',
    message: 'Welcome To The Hell World !!',
  });
};
