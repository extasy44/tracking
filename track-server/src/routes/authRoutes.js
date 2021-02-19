const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const keys = require('../../config/keys');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save;

    const token = jwt.sign({ userId: this.user._id }, keys.MY_SECRET_KEY);

    res.send(token);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post('/signin', async (req, res) => {
  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ error: 'Email not found' });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, keys.MY_SECRET_KEY);
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }
});

module.exports = router;