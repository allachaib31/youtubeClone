// app.js
process.loadEnvFile("./.dev.env");
const express = require("express");
const cluster = require("cluster");
const os = require("os");
const { setupMaster, setupWorker } = require("@socket.io/sticky");
const { createAdapter, setupPrimary } = require("@socket.io/cluster-adapter");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const { default: rateLimit } = require("express-rate-limit");
const session = require("./middleware/session");
const SocketController = require("./socket/socket");
const app = express();
const server = http.createServer(app);

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  console.log(`Master ${process.pid} is running`);
  setupMaster(server, {
    loadBalancingMethod: "least-connection",
  });
  setupPrimary();
  cluster.setupPrimary({
    serialization: "advanced",
  });
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  console.log(`Worker ${process.pid} started`);
  const io = require("socket.io")(server);
  io.adapter(createAdapter());
  setupWorker(io);
  exports.socketController = new SocketController(io);
  const auth = require("./routes/auth/auth.router");
  const channel = require("./routes/channel/channel.routers");
  const video = require("./routes/video/video.router");

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
    .use(morgan("tiny"))
    .use("/", auth)
    .use("/", channel)
    .use("/", video);
    
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(
      `Worker ${process.pid} started. Server running on port ${PORT}`
    );
  });
}

