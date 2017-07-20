import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import console from 'winston';
import config from 'getconfig';

import { HTTP_STATUS } from './const';
import { sender } from './middleware';
import HttpError from './HttpError';

const app = express();

app.use(bodyParser.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/', (request, response, next) => {
  response.statusCode = HTTP_STATUS.BAD_REQUEST;
  next();
}, sender);

app.get('/hello', (request, response, next) => {
  response.statusCode = HTTP_STATUS.SUCCESS;
  response.message = 'Hello Yowu\'s Open API Server World !!!';
  response.rows = [{ Hello: 'World' }, { Foo: 'Bar' }];
  next();
}, sender);

app.get('/error', (request, response, next) => {
  try {
    if (request.query.type === '404') {
      throw new HttpError({
        status: 404,
        code: 'NOT_FOUND_EXCEPTION',
        message: 'Not Found Data',
      });
    } else if (request.query.type === '403') {
      throw new HttpError({
        status: 403,
        code: 'USER_PERMISSION_DENIED',
        message: 'This User Permission Denied',
      });
    } else {
      response.statusCode = HTTP_STATUS.SUCCESS;
      response.rows = [1, 2, 3, 4];
      next();
    }
  } catch (error) {
    response.statusCode = error.status;
    response.message = error.message;
    response.code = error.code;
    response.error = error;
    next();
  }
}, sender);

app.all('*', (request, response, next) => {
  response.statusCode = HTTP_STATUS.NOT_IMPLEMENTED;
  next();
}, sender);

app.listen(config.PORT, () => {
  console.info(`API Server Listening ${config.PORT} port !!`);
});
