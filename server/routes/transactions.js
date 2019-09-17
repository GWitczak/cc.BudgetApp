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
        else {
            user.globalBalance = user.globalBalance + transaction.amount;
            wallet.balance = wallet.balance + transaction.amount;
        }

        user.history.push(transaction);
        wallet.history.push(transaction);
        user = await user.save();
        res.send(transaction);
    } catch (err) {
        res.status(500).send(err.message);
    }
})


router.get('/', auth, async (req, res) => {
    let user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(404).send("Couldn't find user with that id.");

    const transactions = await user.history;
    res.send(transactions);
})

router.get('/:id'), auth, async (req, res) => {
    let user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(404).send("Couldn't find user with that id.");

    const idx = user.wallet.findIndex((element) => {
        return element._id == req.params.id
    });
    if (index === -1) return res.status(404).send("Couldn't find wallet with that id.");

    const transactions = await wallet[idx].history;
    res.send(transactions);
}

module.exports = router;
