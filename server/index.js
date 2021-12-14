require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const session = require('express-session');
const indexRouter = require("./routers");
const cookieParser = require("cookie-parser");

const PORT = 80;
const client = `${process.env.CLIENT_URL}` 
const test = `https://localhost:3000`
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "saltkey",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  cors({
    origin: ['https://localhost:3000'],
    // origin : true, 
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



server = app.listen(PORT, () => console.log("http server running"))
