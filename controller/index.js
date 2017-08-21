const Router = require('express').Router;

const Hello = require('./Hello');
const Calc = require('./Calc');

const Controller = Router();

Controller.use('/hello', Hello);
Controller.use('/Calc', Calc);

module.exports = Controller;
