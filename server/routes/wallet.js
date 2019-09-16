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
  let element

  if (type === 'account') {
    element = Account.create(req.body, res);
  } else if (type === 'cash') {
    element = Cash.create(req.body, res);
  } else if (type === 'debitCard') {
    element = DebitCard.create(req.body, res);
  } else return res.status(400).send('Wrong type of wallet element.');
  
  user.wallet.push(element);
  user.globalBalance = user.globalBalance + element.balance;

  user = await user.save();
  
  res.send(element);
});

router.delete('/:id', auth, async (req, res) => {
  let user = await User.findOne({ _id: req.user._id });

  const idx = user.wallet.findIndex((element) => {
    return element._id == req.params.id
  });

  if (idx === -1) return res.status(404).send('The account with the given ID was not found.');

  const element = user.wallet[idx];

  user.wallet.splice(idx, 1);
  user.globalBalance = user.globalBalance - element.balance;

  user = await user.save();
  res.send(element);
})


module.exports = router; 