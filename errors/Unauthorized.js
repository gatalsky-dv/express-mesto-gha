const { ERR_401 } = require('./errorСodes');

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.errorMessage = message;
    this.statusCode = ERR_401;
  }
}

module.exports = Unauthorized;
