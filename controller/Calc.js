const Router = require('express').Router;

const { sender, errorSender } = require('../util');

const Service = require('../service');

const Calc = Router();

Calc.post('/plus', (request, response) => {
  try {
    sender(request, response, Service.Calculator.plus(request.body.a, request.body.b));
  } catch (error) {
    errorSender(request, response, error);
  }
});

module.exports = Calc;
