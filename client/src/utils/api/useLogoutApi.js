import axios from 'axios';
require('dotenv').config();

export const useLogoutApi = () => {
  const SERVER = process.env.REACT_APP_SERVER_URL 
  // || 'http://localhost:80'
  const logoutHandler = async () => {
    
    return await axios.post(
      SERVER + "/users/signout",
      // { withCredentials: true }
    )
    .then(result => {
      // console.log(result)
      return { msg : "logout success", err: null}
    })
    .catch(err => { 
      return { msg : null, err : err }
    })
  }  

  return {
    logoutHandler
  }
}
