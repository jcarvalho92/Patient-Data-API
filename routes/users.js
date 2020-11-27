const {User, validate} = require('../models/user'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//get user by email
router.get('/:email', async (req, res) => {
  const user = await User.findById(req.params.email);

  if (!user) return res.status(404).send('The user with the given email was not found.');

  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = new User({ 
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
  });
  user = await user.save();
  
  res.send(user);
});

module.exports = router; 