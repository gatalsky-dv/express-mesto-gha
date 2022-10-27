const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const { ERR_404 } = require('./errors/errorСodes');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { loginValidation, createUserValidation } = require('./middlewares/validation');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// app.use((req, res, next) => {
//   req.user = {
//     _id: '6353bd12cfb13587a708ea4e',
//   };
//   next();
// });

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/*', (req, res) => {
  res.status(ERR_404).json({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);
