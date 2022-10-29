const { ERR_500 } = require('../errors/errorСodes');

const errorHandl = (err, req, res, next) => {
  const { statusCode = ERR_500, message } = err;
  res
    .status(statusCode)
    .send({ message: statusCode === ERR_500 ? 'На сервере произошла ошибка' : message });
  next();
};

module.exports = errorHandl;
