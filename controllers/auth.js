const { StatusCodes } = require("http-status-codes");
const {
  BADREQUESTERROR,
  UNAUTHORIZEDERROR,
  NOTFOUNDERROR,
} = require("../errors");
const USERAUTH = require("../models/auth");

const register = async (req, res) => {
  //   const { email, password } = req.body;
  const user = await USERAUTH.create({ ...req.body });
  res.status(StatusCodes.OK).json({ name: user.name, email: user.email });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    throw new BADREQUESTERROR("YOU NEED TO PROVIDE ALL FIELDS");
  }
  const user = await USERAUTH.findOne({ email });
  if (!user) {
    throw new UNAUTHORIZEDERROR("YOU ARE NOT REGISTERED, PLEASE DO");
  }
  const comparePassword = await user.comparePassword(password);
  if (!comparePassword) {
    throw new UNAUTHORIZEDERROR("PASSWORD IS INCORRECT");
  }
  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ token, name: user.name, email: user.email });
};

module.exports = { register, login };
