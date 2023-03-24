require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./db/connect");
const errorHandlerMiddleWare = require("./middleware/errorHandler");
const authMiddleware = require("./middleware/auth.js");

const notFound = require("./middleware/notFound");
const usersTestRouter = require("./routes/usersTest");
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
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
app.use("/api/v1/", usersTestRouter);
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/jobs/", authMiddleware, jobsRouter);

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
