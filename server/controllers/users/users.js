module.exports = {
  // *  POST users/check-email
  checkEmail : (req, res) => {
    return res.send('POST /users/check-email OK')
  }, 

  // *  GET users/send-email
  sendEmail : (req, res) => {
    return res.send('GET /users/send-email OK')
  },

  // *  POST users/signin
  signin : (req, res) => {
    return res.send('POST /users/signin OK')
  },

  // *  POST users/signup
  signup : (req, res) => {
    return res.send('POST /users/signup OK')
  },

  // *  POST users/signout
  signout : (req, res) => {
    return res.send('POST /users/signout OK')
  },
}

