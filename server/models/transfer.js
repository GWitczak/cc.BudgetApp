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

// data, id konta z którego chcemy zrobić przelew, id konta na które chcemy zrobić przelew, amount, title
transferSchema.statics.create = function createTransfer(req, res) {
    const { error } = validateTransfer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    return new Transfer({ 
      idAccountFrom: transfer.idAccountFrom,
      idAccountTo: transfer.idAccountTo,
      amount: transfer.amount,
      title: transfer.title
    });
}

const Transfer = mongoose.model('Transfer', TransferSchema);

function validateTransfer(transfer) {
  const schema = {
      amount: Joi.number().min(1).max(10000).required(),
      title: Joi.string().min(5).max(30).required()
  };
  return Joi.validate(transfer, schema);
}

exports.Transfer = Transfer;