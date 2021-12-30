import { useState, useEffect } from 'react';
import { getEmailValidation } from '../../../api/signup'
import { createUserHandler } from '../../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux';
import { isShowLoginModalHandler, isShowSignUpModalHandler } from '../../../redux/actions/actions';
import axios from 'axios';
export const useForm = () => {
  // state values to give input value 
  const [values, setValues] = useState({
    email : '', code : '', userName : '', 
    password: '', password2: '', gender : 'male',
    social : false,
  }); 

  // state values of error msg, and valid for next move (email => code)
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({ on: false, msg : "" });
  const [isValid, setIsValid ] = useState( [false, false] );
  const [codeMsg, setCodeMsg] = useState({ on : false, msg: "" })
  const [toLogin, setToLogin] = useState({ on: false }) // back to login component
  const [goodToGo, setGoodToGo] = useState(false); // !good to call api request !
  const [payload, setPayload] = useState({}); 
  // Since the email component disappeared, has to save it as state value to payload 
  const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  // Set input-values on change
  const handleInputChange = e => {
    const { name, value } = e.target; 
    setValues({ ...values, [name] : value})
  };

  // Set input-radio values when change 
  const handleRadioChange = e => {
    if(e.target.checked){
      setValues({...values, gender : e.target.value})
    }
  }

  // Input on keyPress => set false of all error msg
  const handleKeyPress = (e) => {
    setErrors({ on: false, msg : "" })
    setCodeMsg({ on: false, msg : "" })
    setToLogin({ on: false, msg : "" })
  };
  
  // Form tag onSubmit handler Only on Sign form-tag
  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = validationInfo(values);
    setErrors(newErrors);
    if(newErrors.done) setGoodToGo(true)
    else setGoodToGo(false)
  }

  // Email-Validation ! first validation step
  const emailValidation = async () => {
    if(!values.email){
      setErrors({ on : true, msg : "이메일을 입력해 주세요"})
    }
    else if(!pattern.test(values.email) ||
      !values.email.includes('@') || 
      !values.email.includes('.')){
      setErrors({ on : true, msg :"이메일 형식을 확인해 주세요"})
    }
    else{ // email validation => API server request
      const resultStatus = await getEmailValidation('users/email', values.email)
      // console.log(resultStatus);
      if( resultStatus === 200 ){
        const { email } = values ;
        //! the moment to save email on payload 
        if( email ) setPayload({ email })
        setErrors({ on : true, msg :"사용 가능한 이메일 입니다." });
        setCodeMsg({ on: true, msg : "이메일 인증을 완료해 주세요" });
        setIsValid([true, isValid[1]]); // email done so to go on to the next (code validation)
        
      }
      else if ( resultStatus === 203 ){
        setIsValid([false, isValid[1]]); 
        setErrors({ on : true, msg :"이미 가입된 회원 입니다" });
        setToLogin({ on : true })
      }
      else{
        setIsValid([false, isValid[1]]); 
        setErrors({ on : true, msg :"앗 서버 에러가 낫어요" });
      } 
    }
  }
  // Code validation - second Validation  
  const codeValidation = () => {
    if(!values.code || values.code.length !== 6){
      setErrors({ on:true, msg :"6자리 인증 코드를 입력 하세요"});
    } 
    //! all validation done for the first view
    else if(values.code === "test12"){
      setIsValid([isValid[0], true])
    }
  }

  // !useEffect - api call for user signin
  useEffect( async () => {
    if(goodToGo){
      const userEmail = document.querySelector('.emailDiv').innerText;
      const newPayload = Object.assign({}, values, { email : userEmail})
      console.log(newPayload)
      // createUserHandler( 'users/signup', newPayload);
      await axios.post(
        'http://localhost:80/users/signup',
        newPayload,
        { withCredentials : true }
      )
      .then(result => {
          console.log("then result ========", result);
          dispatch(isShowLoginModalHandler(true));
          dispatch(isShowSignUpModalHandler(false));
      })
      .catch(err => {
          console.log("catch errorrrr========", err.response)
      })

    }
    return () => {
      setErrors({ on : false, msg: ""});
      setGoodToGo(false); 
      // clear to reset 
    }
  },[goodToGo])

  // all customed state-hook to use 
  return { 
    isValid, values, errors, codeMsg, toLogin,
    handleInputChange, handleRadioChange, handleSubmit,
    handleKeyPress, emailValidation, codeValidation, 
  }
}


// Actual signup validation! 
export const validationInfo = (values) => {
  let validMsg = { };

  if(values.userName === ''){ 
    validMsg.userName = "닉네임을 입력해 주세요";
    validMsg.done = false;
  }
  if(!values.gender){
    validMsg.userName = "성별을 선택해 주세요";
    validMsg.done = false;
  }
  if(!values.password  || !values.password2){
    validMsg.password= "비밀번호를 입력해 주세요" 
    validMsg.done = false;
  }
  if(values.password && values.password2 && values.password !== values.password2){
    validMsg.password = "비밀번호가 일치 하지 않습니다" 
    validMsg.done = false;
  }
  if(values.userName && values.password && 
    values.password2 &&values.password == values.password2){
    validMsg.done = true ;
  }
  return validMsg
}
