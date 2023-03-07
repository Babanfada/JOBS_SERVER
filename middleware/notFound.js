const { StatusCodes } = require("http-status-codes");
const notFound = (req, res) =>
  res
    .status(StatusCodes.NOT_FOUND)
    .send("This Route does not exist, please check AGAIN!!!!!");

module.exports = notFound;
