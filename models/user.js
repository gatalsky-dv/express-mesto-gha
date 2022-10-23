const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: [true, 'Имя пользователя'], // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  about: {
    type: String,
    required: [true, 'Информация о пользователе'],
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, 'Ссылка на аватарку'],
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
