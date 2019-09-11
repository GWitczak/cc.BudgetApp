// importy routerow
const express = require('express');
const test = require('../routes/tests')
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/tests', test);
  app.use(error);
}