const Card = require('../models/card');
const NotFound = require('../errors/NotFound');
const { ERR_500, ERR_404, ERR_400 } = require('../errors/errorСodes');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(() => res.status(ERR_500).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create({ name, link, owner: ownerId })
    .then(card => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERR_400).send({ message: 'Переданны некорректные данные' });
      }
      return res.status(ERR_500).send({ message: 'Произошла ошибка' })
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => { throw new NotFound('Карточка не найдена') })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERR_400).send({ message: 'Переданны некорректные данные' });
      }
      if (err.statusCode === ERR_404) {
        return res.status(ERR_404).send({ message: 'Данные не найдены' });
      }
      return res.status(ERR_500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.putLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => { throw new NotFound('Карточка не найдена') })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERR_400).send({ message: 'Переданны некорректные данные' });
      }
      if (err.statusCode === ERR_404) {
        return res.status(ERR_404).send({ message: 'Карточка не найдена' });
      }
    return res.status(ERR_500).send({ message: 'Произошла ошибка' });
  });
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => { throw new NotFound('Карточка не найдена') })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERR_400).send({ message: 'Переданны некорректные данные' });
      }
      if (err.statusCode === ERR_404) {
        return res.status(ERR_404).send({ message: 'Карточка не найдена' });
      }
    return res.status(ERR_500).send({ message: 'Произошла ошибка' });
  });
};