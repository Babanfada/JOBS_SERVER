const { StatusCodes } = require("http-status-codes");
const  CUSTOMERROR  = require("./custom_error");
class UNAUTHORIZEDERROR extends CUSTOMERROR {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UNAUTHORIZEDERROR;
