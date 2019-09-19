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
    },
    wallet_id: {
        type: String,
        required: true
    }
});


transactionSchema.statics.create = function createTransaction(req, res) {
    const { error } = validateTransaction(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const accountType = req.body.accountType;
    let transaction = new Transaction({
        accountType: accountType,
        title: req.body.title,
        amount: req.body.amount,
        category: req.body.category,
        wallet_id: req.body.wallet_id
    });

    if (accountType === 'debitCard') {
        transaction.cardOwner = req.body.cardOwner;
        transaction.cardTransaction = true;
        return transaction;
    } else  {
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
        category: ['bills', 'food', 'transport', 'home', 'salary', 'allowance'],
        wallet_id: Joi.string().required()

    })
}

exports.Transaction = Transaction;