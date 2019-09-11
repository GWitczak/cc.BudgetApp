const {Test, validate} = require('../models/test'); 
const express = require('express');
const router = express.Router();
 
router.get('/', async (req, res) => {
  const tests = await Test.find().sort('name');
  res.send(tests);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let test = new Test({ 
    name: req.body.name,
    emptyWallet: req.body.emptyWallet,
    phone: req.body.phone
  });
  test = await test.save();
  
  res.send(test);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const test = await Test.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name,
      emptyWallet: req.body.emptyWallet,
      phone: req.body.phone
    }, { new: true });

  if (!test) return res.status(404).send('The test with the given ID was not found.');
  
  res.send(test);
});

router.delete('/:id', async (req, res) => {
  const test = await Test.findByIdAndRemove(req.params.id);

  if (!test) return res.status(404).send('The test with the given ID was not found.');

  res.send(test);
});

router.get('/:id', async (req, res) => {
  const test = await Test.findById(req.params.id);

  if (!test) return res.status(404).send('The test with the given ID was not found.');

  res.send(test);
});

module.exports = router; 