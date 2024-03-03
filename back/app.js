const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()
const cors = require("cors");
const app = express();
app.use(cors());




mongoose
.connect(process.env.DB, {  //DB 주소
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("connected to database"));



const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.then(() => console.log("Connected to MySQL database"))
  .catch((err) => console.error("Connection to MySQL failed:", err));

module.exports = app;