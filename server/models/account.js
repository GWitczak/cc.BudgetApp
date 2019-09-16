const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

 const accountSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    match: /account/
  },
  name: {
    type: String,
    required: true,
    min: 5,
    max: 50
  },
  balance: {
    type: Number,
    default: 0,
    required: true
  },
  cards: {
    type: Array,
    required: true
  },
  history: {
    type: Array,
    required: true
  }
});

accountSchema.statics.create = function create(account, res) {
    const { error } = validateAccount(account); 
    if (error) return res.status(400).send(error.details[0].message);
  
    return new Account({ 
      type: account.type,
      name: account.name,
      balance: account.balance
    });
};

const Account = mongoose.model('Account', accountSchema)

function validateAccount(account) {
  const schema = {
    type: "account",
    name: Joi.string().min(5).max(50).required(),
    balance: Joi.number().min(0).required()
  };

  return Joi.validate(account, schema);
}

exports.Account = Account; 