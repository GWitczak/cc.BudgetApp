const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const transactionSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    accountType: {
        type: String,
        enum: ['debitCard', 'cash', 'account'],
        required: true,
    },
    cardTransaction: {
        type: Boolean,
        required: true,
        default: false
    },
    cardOwner: {
        type: String,
        required: true,
        default: null
    },
    type: {
        type: String,
        required: true,
        enum: ['exp', 'inc']
    },
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    amount: {
        type: Number,
        required: true
    },
    from: {
        type: Number,
        default: null
    },
    category: {
        type: String,
        required: true,
        enum: ['bills', 'food', 'transport', 'home']
    }
});


transactionSchema.statics.create = function createTransaction(req, res) {
    const { error } = validateTransaction(req);
    if (error) return res.status(400).send(error.details[0].message);
    const accountType = req.accountType;
    let transaction = new Transaction({
        accountType: accountType,
        title: req.title,
        amount: req.amount,
        category: req.category
    });

    if (accountType === 'account') {
        return transaction;
    } else if (accountType === 'cash') {
        return transaction;
    } else {
        transaction.cardOwner = req.cardOwner;
        transaction.cardTransaction = true;
        return transaction;
    }
}

const Transaction = mongoose.model('Transaction', transactionSchema);

function validateTransaction(transaction) {
    return Joi.validate(transaction, {
        accountType: ['debitCard', 'cash', 'account'],
        amount: Joi.number().min(0).required(),
        type: ['exp', 'inc'],
        title: Joi.string().required(),
        category: ['bills', 'food', 'transport', 'home', 'salary', 'allowance']

    })
}

exports.Transaction = Transaction;