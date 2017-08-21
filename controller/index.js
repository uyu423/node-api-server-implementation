const Router = require('express').Router;

const Hello = require('./Hello');

const Controller = Router();

Controller.use('/hello', Hello);

module.exports = Controller;
