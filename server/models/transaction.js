const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const transactionSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    accountType: {
        type: String,
        required: true,
        enum: [ 'cash', 'debitCard', 'account']
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
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    const accountType = req.accountType;
    let transaction = new Transaction({
        date: dateTime,
        accountType: accountType,
        type: req.type,
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
        
    })
}

exports.Transaction = Transaction;