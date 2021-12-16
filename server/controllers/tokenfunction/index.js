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
