
   
// import React, { useEffect, useState } from "react";
import './styles/reset.css';
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { isLoginHandler, isShowLoginModalHandler, isShowSignUpModalHandler } from './redux/actions/actions'
import LoadingIndicator from './components/Loading/LoadingIndicator'
import NavBar from "./components/NavBar/NavBar"

import OotdListPage from "./pages/OotdPage/OotdListPage"
// import {SolidHeart} from "./components/SvgIcon/SvgIcon"
<<<<<<< HEAD
=======
// import Login from "./components/Modal/slideModal/Login"
// import Signup from "./components/Modal/slideModal/Signup"
>>>>>>> 82ce65e (ADD: sessionStorage check to redirect)
import LandingPage from './pages/LandingPage/LandingPage';
import SideBar from './components/SideBar/SideBar'
import {SolidHeart} from "./components/SvgIcon/SvgIcon"
import Modal from "./components/Modal/SignModal/Modal"
// import RecordPage from './pages/RecordPage/RecordPage';
import MyPage from './pages/MyPage/MyPage'
import { loginSuccessHandler } from './redux/actions/actions';
// import styled from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
<<<<<<< HEAD
import RecordPage from './pages/RecordPage/RecordPage'
import axios from 'axios';
require('dotenv').config();

function App() {
<<<<<<< HEAD
  //!Todo : 랜더링시 session 로그인 정보 확인 후 isLogin 값 변경 해주기
  const { isLogin } = useSelector(state => state.isLoginReducer)
=======
  // const { isLogin, accessToken } = useSelector(state => state.isLoginReducer)
  // const { isShowLoginModal, isShowSignUpModal 
  // } = useSelector(state => state.isShowModalReducer);
  // const dispatch = useDispatch();
>>>>>>> 82ce65e (ADD: sessionStorage check to redirect)
=======
import RecordPage from './pages/RecordPage/RecordPage';
import DiaryPage from './pages/MyPage/DiaryPage';
import Footer from './components/Footer/Footer'
import { useCallback, useEffect } from 'react';
import axios from 'axios';
require('dotenv').config();

function App() {
  const { accessToken } = useSelector(state => state.isLoginReducer)
  const dispatch = useDispatch();
  const loginStateHandler = useCallback( bool =>
    dispatch(loginSuccessHandler(bool, accessToken)), [dispatch, accessToken] )
  
  useEffect( ()=> {
<<<<<<< HEAD
    if(sessionStorage.getItem('isLogin')) loginHandler(true)
  }, [])
>>>>>>> ed0f6dd (ADD: useEffect to set login true on App.js)
=======
    if(sessionStorage.getItem('isLogin')) loginStateHandler(true)
  }, [loginStateHandler])
>>>>>>> dd00edd (Fix: modal folder name changed to SignModal from SliderModal)

  const logoutHandler = () => {
    const SERVER = process.env.REACT_APP_SERVER_URL || "http://localhost:80"
    axios.post(SERVER + "/users/signout")
      .then( result => {
        dispatch(loginSuccessHandler(false, ""))
        sessionStorage.removeItem('isLogin')
      })
      .catch( err => {
        console.log(err) // err handler
      })
  }

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar logoutHandler={logoutHandler}/>
        <SideBar />
        {/* <UserInfo/> */}
        <Switch>
          <Route exact path = '/'><LandingPage /></Route>
          <Route path = '/mypage'><MyPage/></Route>
          <Route path = '/ootd-list'><OotdListPage /></Route>
          <Route path = '/record'><RecordPage/></Route>
        </Switch>
        <Modal/>
<<<<<<< HEAD
        {/* <OotdImageBox/> */}
        {/* <DiaryPage /> */}
        <Footer/>
=======
        {/* <DiaryPage /> */}
>>>>>>> a852411 ([feat] landing page 하단 작성 및 nav-header 수정)
      </div>
    </BrowserRouter>
  );
}

export default App;