const express = require('express');
const { Transaction } = require('../models/transaction');
const router = express.Router();
const {  User } = require('../models/user');


router.post('/', async (req, res) => {
    let user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(404).send("Couldn't find user with that id.");

    try {
        let transaction = Transaction.create(req.body, res);
        if (req.body.type === 'exp') user.globalBalance = user.globalBalance - transaction.amount;
        else user.globalBalance = user.globalBalance + transaction.amount;
        
        user.history.push(transaction);
        user = await user.save();
    }
    catch (err) {
        res.status(500).send(err.message);
    }
})


router.get('/', async (req, res) => {
    const transactions = await Transaction.find();
    res.send(transactions);
})
