const express = require('express');
const { Transaction } = require('../models/transaction');
const router = express.Router();

const { User } = require('../models/user');
const auth = require('../middleware/auth')


router.post('/', auth, async (req, res) => {
    let user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(404).send("Couldn't find user with that id.");
    
    let index = await user.wallet.findIndex((x) => {
        return x._id == req.body.wallet_id;
    })
    if (index === -1) return res.status(404).send("Couldn't find wallet with that id.");

    let wallet = user.wallet[index];

    try {
        let transaction = Transaction.create(req, res);
        if (req.body.type === 'exp') {
            if (req.body.amount > wallet.balance) {
                user.globalBalance = user.globalBalance - transaction.amount;
                wallet.balance = wallet.balance - transaction.amount;
            } else return res.status(404).send("You don't have enough money to complete payment.");
        }
        else user.globalBalance = user.globalBalance + transaction.amount;

        user.history.push(transaction);
        user.wallet[index].history.push(transaction);
        console.log(user.wallet[index]);
        user = await user.save();
        console.log(user);
        res.send(transaction);
    } catch (err) {
        res.status(500).send(err.message);
    }
})


router.get('/', auth, async (req, res) => {
    const transactions = await Transaction.find();
    res.send(transactions);
})

module.exports = router;
