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
<<<<<<< HEAD
    origin: ['https://localhost:3000', 'https://wwww.weadresser.ml','https://weadresser.ml'],
=======
    origin: 'https://localhost:3000',
>>>>>>> cab08ae ([task] deploy)
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

<<<<<<< HEAD
<<<<<<< HEAD


server = app.listen(PORT, () => console.log("http server running"))
=======
// sequelize.sync({ force: false, alter: true }) // <- sequelize init 필요 ! (보류)
// let credentials ; // "여기에 AWS 키"
// let server;
// if(credentials){
// server = https.createServer(credentials, app);
// server.listen(port, () =>  console.log("httpSSS server running"))
// }
// else{
<<<<<<< HEAD

=======
>>>>>>> 491efa4 (Fixed : Sign,in,up,out = server url, redirect-url, changed)

app.listen(PORT, () => console.log("http server running"))
>>>>>>> 5d740ba (ADD: Seed files for img and all images)
=======
app.listen(PORT, () => console.log("http server running"));
// }
>>>>>>> cab08ae ([task] deploy)
