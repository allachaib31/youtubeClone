const HOSTREDIS = process.env.HOSTREDIS;
const PORTREDIS = process.env.PORTREDIS;
const USERNAMEREDIS =process.env.USERNAMEREDIS;
const PASSWORDREDIS = process.env.PASSWORDREDIS;
const DBNUMBER = process.env.DBNUMBER;
const { Redis } = require('ioredis');
const redisClient = new Redis({
  host : HOSTREDIS ,
  port: PORTREDIS,
  username: USERNAMEREDIS,
  password: PASSWORDREDIS,
  db: DBNUMBER
});

module.exports = { redisClient };