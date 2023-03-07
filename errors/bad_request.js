const { StatusCodes } = require("http-status-codes");
const CUSTOMERROR = require("./custom_error");

class BADREQUESTERROR extends CUSTOMERROR {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BADREQUESTERROR;
