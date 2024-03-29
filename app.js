require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./db/connect");
const errorHandlerMiddleWare = require("./middleware/errorHandler");
const authMiddleware = require("./middleware/authenticate");
const notFound = require("./middleware/notFound");
const usersTestRouter = require("./routes/usersTest");
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");


// Swagger
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");


// security
app.use(helmet());
app.use(cors());
app.use(xss());

// middleware
app.use(express.json());

// routes
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
});

// app.get("/", (req, res) => {
//   res.send("all is well and well");
// });


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
