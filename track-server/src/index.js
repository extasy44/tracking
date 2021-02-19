require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('../config/keys');
const app = express();
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to mongo', err);
});

app.get('/', requireAuth, (req, res) => {
  res.send('Hi there!');
});

app.listen(3002, () => {
  console.log('Listening port on 3002');
});
