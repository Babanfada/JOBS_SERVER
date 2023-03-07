require("dotenv").config();
const connectDB = require("./db/connect");
const USERS = require("./models/usersTest");
// const usersTest = require("./product.json");
const usersTest = require("./UsersTest.json");

const start = async () => {
  try {
    console.log("starting.....");
    await connectDB(process.env.MONGO_URI);
    await USERS.deleteMany();
    await USERS.create(usersTest);
    console.log("SUCEESS !!!, usersTest Data created");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
