require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./db/connect");
const errorHandlerMiddleWare = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const usersTest = require("./routes/usersTest");
// const getAllUsersStatic = require("./routes/usersTest");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// security
app.use(helmet());
app.use(cors());
app.use(xss());

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("all is well");
});
app.use("/api/v1/", usersTest);

// error handling
app.use(errorHandlerMiddleWare);
app.use(notFound);

// server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`SERVER is listening on PORT ${PORT} `);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
