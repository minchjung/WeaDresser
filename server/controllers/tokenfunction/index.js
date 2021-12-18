const { User } = require("../../models");
require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  // helpFunctions for jsonwebtoken
  generateToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "1d" });
  },

  sendToken: (res, token) => {
 
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
