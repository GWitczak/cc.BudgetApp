const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const cashSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    match: /cash/
  }, 
  balance: {
    type: Number,
    default: 0,
    required: true,
    min: function() { return -(this.maxDebit); }
  },
  history: {
    type: Array,
    required: true
  }
});

cashSchema.statics.create = function (cash, res) {
  const { error } = validateCash(cash); 
  if (error) return res.status(400).send(error.details[0].message);


  return new Cash({ 
    type: cash.type,
    balance: cash.balance,
  });
}

cashSchema.statics.consolidate = function (balance, cashObj, res) {
  cashObj.balance += balance;
  if (cashObj.balance < 0) return res.status(400).send("Your cash balance can't be lower than 0!");
  return cashObj
}

const Cash = mongoose.model('Cash', cashSchema);

function validateCash(cash) {
  const schema = {
    type: "cash",
    balance: Joi.number().min(0).required()
  };

  return Joi.validate(cash, schema);
}

exports.Cash = Cash; 