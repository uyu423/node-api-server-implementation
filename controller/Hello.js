const Router = require('express').Router;
const Service = require('../service');

const { sender, errorSender } = require('../util');

const Hello = Router();

Hello.get('/', (request, response) => {
  try {
    sender(request, response, Service.Hello.getHello());
  } catch (error) {
    errorSender(request, response, error);
  }
});

Hello.get('/error', (request, response) => {
  try {
    sender(request, response, Service.Hello.getHell());
  } catch (error) {
    errorSender(request, response, error);
  }
});

module.exports = Hello;
