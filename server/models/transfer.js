const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const transferSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    idAccountFrom: {
        type: String,
        required: true
    },
    idAccountTo: {
        type: String,
        required: true
    },
    amount: {
      type: Number,
      default: 0,
      required: true
    },
    title: {
      type: String,
      required: true
    }
});


transferSchema.statics.create = function createTransfer(req, res) {
    const { error } = validateTransfer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    return new Transfer({ 
      idAccountFrom: req.body.idAccountFrom,
      idAccountTo: req.body.idAccountTo,
      amount: req.body.amount,
      title: req.body.title
    });
}

const Transfer = mongoose.model('Transfer', transferSchema);

function validateTransfer(transfer) {
  const schema = {
      idAccountFrom: Joi.string().required(),
      idAccountTo: Joi.string().required(),
      amount: Joi.number().min(1).max(10000).required(),
      title: Joi.string().min(5).max(30).required()
  };
  return Joi.validate(transfer, schema);
}

exports.Transfer = Transfer;