import _ from 'lodash';
import winston from 'winston';
import { HTTP_STATUS } from '../const';

function errorHandler(request, response, error) {
  winston.error(error.message);
}

export default function sender(request, response) {
  const statusCode = response.statusCode || 500;
  if (statusCode >= 400) errorHandler(request, response, response.error);
  response.status(statusCode).json({
    data: {
      code: response.code || _.findKey(HTTP_STATUS, status => status === statusCode),
      message: response.message || _.findKey(HTTP_STATUS, status => status === statusCode),
      rows: response.rows || [],
    },
  });
}
