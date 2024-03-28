const session = require("express-session");
const RedisStore = require("connect-redis").default;
const { redisClient } = require("../db/redis");

const store = new RedisStore({ client: redisClient });

module.exports = session({
  store,
  secret: process.env.COOKIE_SECRET,
  saveUninitialized: false,
  resave: false,
  name: "sessionId",
  cookie: {
    secure: process.env.ENVIRONMENT === "production" ? true : false,
    httpOnly: true,
    expires: 1000 * 60 * 60 * 24 * 7,
    sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
  },
});
