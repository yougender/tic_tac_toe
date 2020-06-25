'use strict'

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const Controller = require('./lib/Controller');
const ErrorHandler = require('./lib/ErrorHandler');


let app = express();
let controller = new Controller();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(ErrorHandler);


app.get('/', function(req, res) {
  res.send('Tic Tac Toe game is alive');
});

app.post('/', function(req, res) {

  // pass the control to Controller 
  controller.controlGame(req, res);
});

module.exports = app;
