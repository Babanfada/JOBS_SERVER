const { StatusCodes } = require("http-status-codes");
const  CUSTOMERROR  = require("./custom_error");

class NOTFOUNDERROR extends CUSTOMERROR {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NOTFOUNDERROR;
