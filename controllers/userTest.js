const getAllUsersStatic = (req, res) => {
  res.send("get all the fucking static user");
};
const getAllUser = (req, res) => {
  res.send("get all the fucking user ");
};

module.exports = { getAllUsersStatic, getAllUser };
