import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Signup from "./Signup";
import title from './title.svg'
import { LogoContainer,InputContainer,LoginError,LoginBtnContainer } 
from './LoginStyle';
import { getGoogleAccToken, getKakaoCode } 
from '../../../api/social'
import { useLoginApi} from '../../../utils/api/useLoginApi'
import { isShowSignUpModalHandler} from '../../../redux/actions/actions'
import { useSpring } from 'react-spring'
import { useForm } from "../../../utils/useForm";
require('dotenv').config();

function Login({ modalChangeHandler }){
  const [ loginInfo, setLoginInfo ] = useState({ email: "", password: "" });
  // const [ errorMessage, setErrorMessage ] = useState("");
  const { isShowLoginModal, isShowSignUpModal } = useSelector(state => state.isShowModalReducer)
  const dispatch = useDispatch(); 
}
export default Login;