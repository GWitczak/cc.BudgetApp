const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const debitSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    match: /debitCard/
  },
  owner: {
    type: String,
    required: true,
    min: 5,
    max: 50
  },
  balance: {
    type: Number,
    default: 0,
    required: true,
    min: function() { return -(this.maxDebit); }
  },
  maxDebit: {
    type: Number,
    default: 20000,
    required: true
  }
});

debitSchema.statics.create = function createDebitCard(debitCard, res) {
  const { error } = validateDebitCard(debitCard); 
  if (error) return res.status(400).send(error.details[0].message);

  if (-1*debitCard.balance > debitCard.maxDebit) {
    return res.status(400).send("Balance must be greater than or equal to max debit!");
  };

  return new DebitCard({ 
    type: debitCard.type,
    owner: debitCard.owner,
    balance: debitCard.balance,
    maxDebit: debitCard.maxDebit
  });
}

const DebitCard = mongoose.model('DebitCard', debitSchema);

function validateDebitCard(debitCard) {
  const schema = {
    type: "debitCard",
    owner: Joi.string().min(5).max(50).required(),
    balance: Joi.number().max(0).required(),
    maxDebit: Joi.number().min(0)
  };

  return Joi.validate(debitCard, schema);
}

exports.DebitCard = DebitCard; 
