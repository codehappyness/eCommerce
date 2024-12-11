require('dotenv').config();
const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();

// init middlewares
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
console.log(`Process::`, process.env)

// init db
require(`./dbs/init.mongodb`)
const { countConnect, checkOverLoad} = require('./helpers/check.connect')
countConnect();
checkOverLoad();

// init routes

app.get('/', (req, res, next) => {
  const strCompress = "Hello world!";
  return res.status(200).json({
    message: "Welcome Codehappyness",
    metadata: strCompress.repeat(1000)
  })
})

module.exports = app;
