import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import console from 'winston';

const app = express();

app.use(bodyParser.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/', (request, response) => {
  response.sendStatus(400);
});

app.get('/hello', (request, response) => {
  response.json({
    code: 'SUCCESS',
    data: {
      message: 'Hello Yowu\'s Open API Server World !!',
    },
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.info(`API Server Listening ${PORT} port !!`);
});
