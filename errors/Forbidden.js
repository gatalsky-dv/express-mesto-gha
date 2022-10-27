const { ERR_403 } = require('./errorСodes');

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.errorMessage = message;
    this.statusCode = ERR_403;
  }
}

module.exports = Forbidden;
