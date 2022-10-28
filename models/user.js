const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
const Unauthorized = require('../errors/Unauthorized');

const regex = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;

const userSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
    default: 'КотЭ',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Не срал в тапки',
  },
  avatar: {
    type: String,
    default: 'https://www.meme-arsenal.com/memes/de24d21337ce6ac21b430b2723c5560a.jpg',
    validate: {
      validator(v) { return regex.test(v); },
      message: 'Невалидная ссылка',
    },
  },
  email: {
    type: String,
    required: [true, 'Email пользователя'],
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: [true, 'Пароль пользователя'],
    minlength: 8,
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this
    .findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized('Неправильные почта или пароль');
          }
          return user; // теперь user доступен
        });
    });
};

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
