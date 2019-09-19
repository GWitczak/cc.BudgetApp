const express = require('express');
const auth = require('../middleware/auth');
const { User } = require('../models/user');
const { Transfer } = require('../models/transfer');
const router = express.Router();


router.post('/', auth, async (req, res) => {

    let user = await User.findOne({_id: req.user._id });
    if (!user) return res.status(404).send("There is no user with this id.");

    let accountFrom = req.body.idAccountFrom;
    let accountTo = req.body.idAccountTo;

    let idx1 = user.wallet.findIndex((element) => {
        return element._id == accountFrom;
    });
    let idx2 = user.wallet.findIndex((element) => {
        return element._id == accountTo;
    });
    

    try {
        let transfer = Transfer.create(req, res);
        if (idx1 == -1 || idx2 == -1) {
            return res.status(404).send("There is no such account.");
        } else if (req.body.amount > user.wallet[idx1].balance) {
            return res.status(404).send("There is not enought money on sending account.");
        } else {
            user.wallet[idx1].balance = user.wallet[idx1].balance - req.body.amount;
            user.wallet[idx2].balance = user.wallet[idx2].balance + req.body.amount;
        }

        user.history.push(transfer);
        user.wallet[idx1].history.push(transfer);
        user.wallet[idx2].history.push(transfer);
        user = await user.save();
        res.send(transfer);

    } catch (err) {
        res.status(500).send(err.message);
    }




        
});

module.exports = router;