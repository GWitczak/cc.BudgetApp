const express = require('express');

// importy routerow
const testRouter = require('../routes/tests');
const userRouter = require('../routes/users');
const loginRouter = require('../routes/login');
const walletRouter = require('../routes/wallet');
const transactionRouter = require('../routes/transactions');

const error = require('../middleware/error');

module.exports = function(app) {

  //Decode req
  app.use(express.json());


  //All routes
  app.use('/api/users', userRouter);
  app.use('/api/login', loginRouter);
  app.use('/api/wallet', walletRouter);
  app.use('/api/transactions', transactionRouter);

  app.use('/api/tests', testRouter);


  // Errors handler
  app.use(error);
};
