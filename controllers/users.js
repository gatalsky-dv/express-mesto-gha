const User = require('../models/user');
const NotFound = require('../errors/NotFound');
const { ERR_500, ERR_404, ERR_400 } = require('../errors/errorСodes');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(ERR_500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => { throw new NotFound('Пользователь не найден'); })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERR_400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.statusCode === ERR_404) {
        return res.status(ERR_404).send({ message: 'Данные не найдены' });
      }
      return res.status(ERR_500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERR_400).send({ message: 'Переданны некорректные данные' });
      }
      return res.status(ERR_500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => { throw new NotFound('Пользователь не найден') })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERR_400).send({ message: 'Переданны некорректные данные' });
      }
      if (err.statusCode === ERR_404) {
        return res.status(ERR_404).send({ message: 'Данные не найдены' });
      }
      return res.status(ERR_500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => { throw new NotFound('Пользователь не найден'); })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERR_400).send({ message: 'Переданны некорректные данные' });
      }
      if (err.statusCode === ERR_404) {
        return res.status(ERR_404).send({ message: 'Данные не найдены' });
      }
      return res.status(ERR_500).send({ message: 'Произошла ошибка' });
    });
};