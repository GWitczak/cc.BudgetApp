const { Account } = require('../models/account'); 
const { Cash } = require('../models/cash'); 
const { DebitCard } = require('../models/debitCard'); 
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {

  let user = await User.findOne({ email: req.body.userEmail });
  if (!user) return res.status(404).send('User with the given e-mail not found.');

  const type = req.body.type;
  let account

  if (type === 'account') {
    account = Account.create(req.body, res);
  } else if (type === 'cash') {
    account = Cash.create(req.body, res);
  } else if (type === 'debitCard') {
    account = DebitCard.create(req.body, res);
  } else return res.status(400).send('Wrong type of account.');
  
  user.wallet.push(account);
  user.globalBalance = user.globalBalance + account.balance;

  user = await user.save();
  
  res.send(account);
});


module.exports = router; 