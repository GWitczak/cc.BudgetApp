const express = require('express');

// importy routerow
const testRouter = require('../routes/tests');
const userRouter = require('../routes/users');
const loginRouter = require('../routes/login');
const accountRouter = require('../routes/accounts')

const error = require('../middleware/error');

module.exports = function(app) {

  //Decode req
  app.use(express.json());


  //All routes
  app.use('/api/users', userRouter);
  app.use('/api/login', loginRouter);
  app.use('/api/accounts', accountRouter);
  
  app.use('/api/tests', testRouter);


  // Errors handler
  app.use(error);
}