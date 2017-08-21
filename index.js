const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('getconfig');

const HttpError = require('./HttpError');
const { HTTP_STATUS } = require('./const');
const { errorSender } = require('./util');

const Controller = require('./controller');

const app = express();

app.use(bodyParser.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use('/', Controller);

app.all('*', (request, response) => {
  errorSender(request, response, new HttpError({
    status: HTTP_STATUS.NOT_IMPLEMENTED,
    code: 'NOT_IMPLEMENTED',
    message: 'This Method is Not Implemented.',
  }));
});

app.listen(config.PORT, () => {
  console.log(`API Server Listening ${config.PORT} port !!`);
});
