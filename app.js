// require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const { ERR_404 } = require('./errors/errorСodes');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use((req, res, next) => {
  req.user = {
    _id: '6353bd12cfb13587a708ea4e',
  };
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/*', (req, res) => {
  res.status(ERR_404).json({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);
