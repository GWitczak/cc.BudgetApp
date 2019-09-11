const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Test = mongoose.model('Test', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  emptyWallet: {
    type: Boolean,
    default: false
  },
  phone: {
    type: Number,
    required: true
  }
}));

function validateTest(test) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.number().required(),
    emptyWallet: Joi.boolean()
  };

  return Joi.validate(test, schema);
}

exports.Test = Test; 
exports.validate = validateTest;