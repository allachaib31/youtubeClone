process.loadEnvFile("./.dev.env");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const cluster = require("cluster");
const { default: rateLimit } = require("express-rate-limit");
const numCPUs = require("os").cpus().length;
const session = require("./middleware/session");
const app = express();

const MONGODB = process.env.MONGODB;
mongoose
  .connect(MONGODB)
  .then(() => {
    console.log("MONGODB IS CONNECTED!!");
  })
  .catch((err) => {
    console.error(err);
  });

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: "Too many requests from this IP, please try again later.",
  statusCode: 429,
  headers: true,
});

app
  .use(express.json())
  .use(session)
  .use(helmet())
  .disable("x-powered-by")
  .use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  )
  .use(limiter)
  .use(compression())
  .use(cookieParser())
  .use(morgan("tiny"));

app.get("/", (req, res) => {
  return res.status(200).send("hello world!!");
});

const startServer = () => {
  const PORT = process.env.PORT || 4000;
  const server = app.listen(PORT, () => {
    console.log(`server is start running in ${PORT}`);
  });
};

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log("Forking a new worker...");
    cluster.fork();
  });
}else{
    startServer();
}
