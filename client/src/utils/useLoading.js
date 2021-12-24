import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { getLocationData, tempLoadingHandler } from '../redux/actions/actions'
import { loginSuccessHandler } from '../redux/actions/actions'
import axios from 'axios';
require('dotenv').config();

export const useLoading = () => {

  // const history = useHistory();
  const dispatch = useDispatch();
  const loginStateHandler = useCallback( bool =>dispatch(loginSuccessHandler(bool, "")), [dispatch] )
  const { tempLoading }  = useSelector(state => state.tempLoadingReducer); 

  useEffect( ()=> {
    if(sessionStorage.getItem('isLogin')) loginStateHandler(true)
  }, [loginStateHandler])

  useEffect( async ()=> {
    await navigator.geolocation.getCurrentPosition(
      async (location) => { 
        const lat = location.coords.latitude;
        const lot = location.coords.longitude;
        await dispatch(getLocationData(lat, lot));
      }, 
      (err) => { 
        console.log(err)
        dispatch(tempLoadingHandler(false))
      }, 
      { enableHighAccuracy: true,maximumAge: 30000,timeout: 27000 }
    );
    
  }, [dispatch])

  const logoutHandler = async () => {
<<<<<<< HEAD
    const SERVER = process.env.REACT_APP_SERVER_URL 
    await axios.post(SERVER + "/users/signout")
=======
    const SERVER = process.env.REACT_APP_SERVER_URL
    await axios.post(SERVER + "/users/signout", {}, {withCredentials: true})
>>>>>>> cab08ae ([task] deploy)
      .then( result => {
        dispatch(loginSuccessHandler(false, ""))
        sessionStorage.removeItem('isLogin')
        // history.push('/')
        //! url 변경은 되나 컴포넌트가 ladning page로 가지 않음 ! 
<<<<<<< HEAD
        window.location.assign('https://www.weadresser.ml/') // <- 강제 home 
=======
        window.location.assign('https://www.weadresser.ml') // <- 강제 home 
>>>>>>> cab08ae ([task] deploy)
      })
      .catch( err => {
        console.log(err) // err handler
      })
    // history.push('/')
  }

  return { 
    tempLoading, logoutHandler,
  }
}
