require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const https = require("https");
const session = require('express-session');
const indexRouter = require("./routers");
const cookieParser = require("cookie-parser");
//require("./models");
// const sequelize = require('Sequelize')

const port = 80;
const client = `${process.env.CLIENT_URL}` 
const test = `https://localhost:3000`
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(
//   session({
//     secret: "saltkey",
//     resave: false,
//     saveUninitialized: true,
//   })
// );
app.use(cookieParser());
app.use(
  cors({
<<<<<<< HEAD
    origin: 'https://localhost:3000', 
=======
    origin: true ,
>>>>>>> cdc5f98 (Fixed : Token Function with 영한님)
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT", "PATCH"],
  })
);
// app.use(cookieParser('abcd'));

app.use("/", indexRouter);
app.get("/", (req, res) => {
  res.send("Hello World"); 
});

app.get("/check", (req, res) => {
  res.send("check point success");
});

app.listen(port, () => console.log("http server running"));