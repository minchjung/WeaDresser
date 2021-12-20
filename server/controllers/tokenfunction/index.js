const { User } = require("../../models");
require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  // helpFunctions for jsonwebtoken
  generateToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "1d" });
  },

  sendToken: (res, token) => {
<<<<<<< HEAD
 
=======
    res.cookie("Bearer", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 60 * 60 * 24 * 1000,
      // domain: "localhost",
      // path: "/",
      // overwrite: true,
      // signed : true
    });
    // res.cookie("Login", "true", {
    //   httpOnly: true,
    //   sameSite: "none",
    //   secure: true,
    //   maxAge: 60 * 60 * 24 * 1000,
    //   domain: "localhost",
    //   path: "/",
    //   ovewrite: true,
    //   signed : true
    // });
>>>>>>> 19e8a8d (before to clear for cl)
  },

  isAuthorized: (req) => {

<<<<<<< HEAD
=======
    const cookieToken = req.cookies.Bearer;
    if (!cookieToken) return null;
    try {
      return verify(cookieToken, process.env.ACCESS_SECRET);
>>>>>>> 62ccd36 ([modify] sidebar 일부 수정, edit요청 수정)

  },

  isValid: (email, id) => {
    const validUser = User.findOne({where: {email: email, id: id}})
    try{
      return validUser;
    }
    catch(err) {
      return false;
    }
    
  }
};
