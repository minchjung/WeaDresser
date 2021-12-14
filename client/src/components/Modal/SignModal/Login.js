import React, { useState } from "react";
import title from './title.svg'
import { CloseModalButton } from "./ModalStyle";
import { useLoginApi} from '../../../utils/api/useLoginApi'
import { LoginContainer,LogoContainer,InputContainer,LoginError,LoginBtnContainer } from './LoginStyle';
// import { isShowLoginModalHandler, isShowSignUpModalHandler} from '../../../redux/actions/actions'
require('dotenv').config();

<<<<<<< HEAD
function Login({ modalChangeHandler }){
  const [ loginInfo, setLoginInfo ] = useState({ email: "", password: "" });
  // const [ errorMessage, setErrorMessage ] = useState("");
  const { isShowLoginModal, isShowSignUpModal } = useSelector(state => state.isShowModalReducer)
  const { getGoogleAccToken, getKakaoCode, handleUserLoginApi, errorMessage, setErrorMessage } = useLoginApi();
  // const history= useHistory();

  // Translate animation (Signin)
  const displayLogin = useSpring({
    transform: isShowLoginModal ? 'translateY(0%)' : 'translateY(100%)',
    opacity : isShowLoginModal ? 1 : 0 
  });
  // Translate animation (Signup)
  const displaySignup = useSpring({
    transform: isShowSignUpModal ? 'translateX(0%)' : 'translateX(100%)', 
    opacity : isShowSignUpModal ? 1 : 0 
  })
=======
function Login({ closeModalByBtn, displayLogin, modalChangeHandler }){
  const [ loginInfo, setLoginInfo ] = useState({ email: "", password: "" });
  const { getGoogleAccToken, getKakaoCode, validCheckHandler, 
    errorMessage, setErrorMessage, active, setActive,  } = useLoginApi();
>>>>>>> f3dcdc5 (Refactor: Modal, Sifnup, SigmForm, useForm, useSlider)

  // inputvalue save to the loginInfo States
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value.toLowerCase() });
    setErrorMessage("");
  };
  // On backSpace key => active false 
  const handleKeyPress = (e) => {
    if(e.key === 'Backspace') setActive("")
  };
  return (
    <>
      <LoginContainer style={displayLogin}>
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
          <button onClick={()=>{ validCheckHandler(loginInfo)}}  className={`login-btn${active}`}> 로그인</button>
          <button onClick={modalChangeHandler} className='singup-btn'>회원가입</button>
          <button onClick={getKakaoCode} className='kakao-btn'>Kakao</button>
          <button onClick={getGoogleAccToken} className='google-btn'>Google</button>
        </LoginBtnContainer>
        <CloseModalButton onClick={closeModalByBtn}/>
      </LoginContainer>
    </>
  );
}
export default Login;