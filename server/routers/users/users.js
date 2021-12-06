const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/users/users");

// *  POST users/email
router.get("/email", usersController.checkEmail);

<<<<<<< HEAD
// *  GET users/send-email
router.get("/email/:code", usersController.sendEmail);
=======
// *  GET users/email:code
router.get("/email:code", usersController.sendEmail);
>>>>>>> cdc5f98 (Fixed : Token Function with 영한님)

// *  POST users/signin
router.post("/signin", usersController.signin);

// *  POST users/signup
router.post("/signup", usersController.signup);

// *  POST users/signout
router.post("/signout", usersController.signout);

module.exports = router;
