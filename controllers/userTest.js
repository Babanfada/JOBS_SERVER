const USERS = require("../models/usersTest");
const { StatusCodes } = require("http-status-codes");
const getAllUsersStatic = (req, res) => {
  const { orgName } = req.query;
  const queryObject = {};
  console.log(req.query);
  res.send("get all the fucking static user");
};
const getSingleUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await USERS.findOne({ id: userId });
  res.status(StatusCodes.OK).json({ user });
};
const getAllUser = async (req, res) => {
  const { orgName, userName, email, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  //   console.log(req.query);

  if (orgName) {
    queryObject.orgName = { $regex: orgName, $options: "i" };
  }
  if (userName) {
    queryObject.userName = { $regex: userName, $options: "i" };
  }
  if (email) {
    queryObject.email = email;

    //   {
    //     $regex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    //     $options: "i",
    //   };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;

    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["accountBalance", "education.loanRepayment"];

    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });

    console.log(queryObject);
  }
  let result = USERS.find(queryObject);

  if (sort) {
    const sortWith = sort.split(",").join(" ");
    result = result.sort(sortWith);
  } else {
    result = result.sort("createdAt");
  }
  if (fields) {
    const selectWith = fields.split(",").join(" ");
    result = result.select(selectWith);
  }

  const limit = Number(req.query.limit) || 5;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const usersResults = await result;
  res
    .status(StatusCodes.OK)
    .json({ data: usersResults, nbHits: usersResults.length });
};

module.exports = { getAllUsersStatic, getAllUser, getSingleUser };
