const { Account } = require('../models/account'); 
const { Cash } = require('../models/cash'); 
const { DebitCard } = require('../models/debitCard'); 
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

router.post('/', auth, async (req, res) => {

  let user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send('User with the given id not found.');

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

router.delete('/:id', auth, async (req, res) => {
  let user = await User.findOne({ _id: req.user._id });
  let collection = user.wallet;

  const idx = collection.findIndex((object) => {
    return object._id == req.params.id
  });

  if (idx === -1) return res.status(404).send('The account with the given ID was not found.');

  const account = collection[idx];
  collection.splice(idx, 1);

  console.log(collection);
  user.wallet = collection;
  user = await user.save();

  res.send(account);
});


module.exports = router; 