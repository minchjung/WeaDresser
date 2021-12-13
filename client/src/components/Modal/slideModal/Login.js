import React, { useState } from "react";
<<<<<<< HEAD
import { useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
=======
import { useDispatch, useSelector } from 'react-redux';
import Signup from "./Signup";
>>>>>>> 82ce65e (ADD: sessionStorage check to redirect)
import title from './title.svg'
import { LogoContainer,InputContainer,LoginError,LoginBtnContainer } 
from './LoginStyle';
<<<<<<< HEAD
import { getGoogleAccToken, getKakaoCode } 
from '../../../api/social'
import { isShowLoginModalHandler, loginSuccessHandler } 
=======
import { CloseModalButton } from "./ModalStyle";
// import { getGoogleAccToken, getKakaoCode } 
// from '../../../api/social'
import { useLoginApi} from '../../../utils/api/useLoginApi'
<<<<<<< HEAD

import { isShowLoginModalHandler, isShowSignUpModalHandler, loginSuccessHandler } 
>>>>>>> e9a8da3 (ADD: LoginAPi custom hook , Refactor: kakao social login)
from '../../../redux/actions/actions'
<<<<<<< HEAD
=======
=======
import { isShowSignUpModalHandler} from '../../../redux/actions/actions'
>>>>>>> 82ce65e (ADD: sessionStorage check to redirect)
import { useSpring } from 'react-spring'
import { useForm } from "../../../utils/useForm";
require('dotenv').config();
>>>>>>> 27cfe2c (Fixd: api moved to utils directory)

function Login({ modalChangeHandler }){
  const [ loginInfo, setLoginInfo ] = useState({ email: "", password: "" });
<<<<<<< HEAD
  const [ errorMessage, setErrorMessage ] = useState("");
=======
  // const [ errorMessage, setErrorMessage ] = useState("");
  const { isShowLoginModal, isShowSignUpModal } = useSelector(state => state.isShowModalReducer)
  const dispatch = useDispatch(); 

>>>>>>> 82ce65e (ADD: sessionStorage check to redirect)
  const [ active, setActive ] = useState("");
  // const history= useHistory();
  const { pattern } = useForm();
  const { getGoogleAccToken, getKakaoCode, handleUserLoginApi, errorMessage, setErrorMessage } = useLoginApi();

  // Translate animation (Signin)
  const props = useSpring({
    transform: isShowLoginModal ? 'translateY(0%)' : 'translateY(100%)',
    opacity : isShowLoginModal ? 1 : 0 
  });
  // Translate animation (Signup)
  const props2 = useSpring({
    transform: isShowSignUpModal ? 'translateX(0%)' : 'translateX(100%)', 
    opacity : isShowSignUpModal ? 1 : 0 
  })

  // inputvalue save to the loginInfo States
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value.toLowerCase() });
    setErrorMessage("");
  };
  // On backSpace key => active false 
  const handleKeyPress = (e) => {
    if(e.key === 'Backspace') setActive("")
  };
  // validition : email=null, password=Null, email regx@ 
  // !Todo  정규식 추가 
  const validCheckHandler = () => {
    const { email, password } = loginInfo

    setActive("")
    if(!email){
      setErrorMessage('이메일를 입력해 주세요')
    }
    else if( !pattern.test(email) || !email.includes('@') || !email.includes('.') ){
      setErrorMessage("이메일 형식을 확인해 주세요")
    }
    else if(!password){
      setErrorMessage('비밀번호를 입력해 주세요')
    }
    //! 6자리 이상 으로 교체
    else if(password.length < 3){
      setErrorMessage('3자리 이상 비밀번호를 입력해 주세요')
    }
    else{
      setActive("-active") // button active
      userLoginHandler() // * login ajax call
    }
        
  };

  // * 일반 유저 로그인 done ! 
  const userLoginHandler = async () => {
    const{ email, password } = loginInfo;
    handleUserLoginApi({ email, password})
<<<<<<< HEAD
    //! server uri dotenv 안될때가 있어요!
<<<<<<< HEAD
    const SERVER = process.env.REACT_APP_SERVER_URI || 'http://localhost:80'
    console.log(" 요청 간다.", SERVER)
    axios.post(
      'http://localhost:80/users/signin',
      { email, password },
      { withCredentials: true }
    )
    .then(result => {
      // isLogin =true & set the accessToken + page redirection
      dispatch(loginSuccessHandler(true, result.data.accessToken));
      dispatch(isShowLoginModalHandler(false))
      sessionStorage.setItem('isLogin', 'true')
      history.push('/')
    })
    .catch(err =>{
      dispatch(loginSuccessHandler(false, ""));
      if(err.response.status === 403){
        setErrorMessage("회원이 아닙니다. 회원 가입을 진행해 주세요")
      }
      else if(err.response.status === 401){
        setErrorMessage("이메일 비밀번호가 일치하지 않습니다.")
      }
      else{
        setErrorMessage("앗! 서버 error가 낫어요!")
      }
    })
=======
>>>>>>> 82ce65e (ADD: sessionStorage check to redirect)
=======
    //! server uri dotenv 안될때 있음!
>>>>>>> b1e5e83 (ADD: dot env 유의 사항 주석 on login.js)
  }
  const modalChangeHandler = () => {
    dispatch(isShowSignUpModalHandler(true));
  }
  return (
    <>{ isShowSignUpModal ? 
      <LoginContainer style={props2}>
        <Signup closeModalByBtn={closeModalByBtn}/> 
      </LoginContainer>
      :
      <LoginContainer style={props}>
        <LogoContainer><img alt="Weadresser" src={title}/></LogoContainer>
        <InputContainer>
          <input 
            className="login-input"
            type="email"
            placeholder="Email"
            onChange={ handleInputValue("email") }
            onKeyUp={ handleKeyPress }
            />
          <input 
            className="login-input"
            type="password"
            placeholder="비밀번호"
            onChange={ handleInputValue("password") }
            onKeyUp={ handleKeyPress }
            />
            <LoginError>{errorMessage}</LoginError>
        </InputContainer>
        <LoginBtnContainer>
          <button onClick={validCheckHandler}  className={`login-btn${active}`}> 로그인</button>
          <button onClick={modalChangeHandler} className='singup-btn'>회원가입</button>
          <button onClick={getKakaoCode} className='kakao-btn'>Kakao</button>
          <button onClick={getGoogleAccToken} className='google-btn'>Google</button>
        </LoginBtnContainer>
        <CloseModalButton onClick={closeModalByBtn}/>
      </LoginContainer>
      }
    </>
  );
}
export default Login;