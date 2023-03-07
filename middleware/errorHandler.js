const { StatusCodes } = require("http-status-codes");
const { CUSTOMERROR } = require("../errors");
const errorHandlerMiddleWare = (err, req, res, next) => {
  if (err instanceof CUSTOMERROR) {
    return res.status(err.statusCode).json({ msg: err.meassge });
  }
};

module.exports = errorHandlerMiddleWare;
