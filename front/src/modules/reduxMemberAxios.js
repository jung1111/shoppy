import { axiosGet, axiosPost} from './reduxAxios';
import { setIsLogin, setIsLogout } from '../reducers/memberReducer';

import * as cookie from '../util/cookies.js';
import { jwtDecode } from 'jwt-decode';


// 로그아웃 - header.jsx 호출
export const getIsLogout = () => {
  return(dispatch) => {
    dispatch(setIsLogout());
  }
} 

// validataionCheck()
export const validataionCheck = ({formData, userIdRef, userPassRef}) => {
  let checkFlag = true;

  if(!formData.userId.trim()){
    alert("아이디를 입력해주세요");
    userIdRef.current.focus();
    checkFlag = false;
  } else if(!formData.userPass.trim()){
    alert("패스워드를 입력해주세요");
    userPassRef.current.focus();
    checkFlag = false;
  }
  return checkFlag;
} 

export function getIsLogin({formData}){
  const url = 'http://127.0.0.1:8080/member/login';
  const data = formData;

  return async(dispath) =>{
    const loginResult = await axiosPost({url, data})
    const cnt = loginResult.cnt;
    console.log(' loginResult->', loginResult);

    if(cnt === 1) {
      cookie.setCookie('x-auth-jwt', loginResult.token);
      const userInfo = jwtDecode(loginResult.token);
      localStorage.setItem("userInfo", JSON.stringify(userInfo)); 

      dispath(setIsLogin({cnt}));
    }
  }

}