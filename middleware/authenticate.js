const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const USERAUTH = require("../models/auth");
const {
  BADREQUESTERROR,
  UNAUTHORIZEDERROR,
  NOTFOUNDERROR,
} = require("../errors");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UNAUTHORIZEDERROR(
      "INVALID CREDENTIALS, YOU NEED TO BE LOGGED IN TO ACCESS THOS ROUTE"
    );
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (err) {
    throw new UNAUTHORIZEDERROR(
      "INVALID CREDENTIALS, YOU NEED TO BE LOGGED IN TO ACCESS THOS ROUTE"
    );
  }
};

module.exports = auth;
