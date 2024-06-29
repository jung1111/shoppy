import React, { useState, useRef } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import * as cookie from '../util/cookies.js';
import {jwtDecode} from 'jwt-decode';

export default function Login() {
  const navigate = useNavigate();
  const userIdRef = useRef(null);
  const userPassRef = useRef(null);
  const [formData, setFormData] = useState({userId:'', userPass:''});

  const handleChange = (e) => {
    const {name, value} = e.target;   // {name:userId, value:'test'},{name:userPass, value:'1234'}
    setFormData({...formData, [name]:value});
  }

    //로그인 버튼 클릭 - 서버연동
  const handleSubmit = (e) => {  //submit 버튼이 클릭했습니다. 이벤트!!!
    e.preventDefault();

    if(validataionCheck()){ //validataionCheck() 결과가 true이면 서버전송
      console.log(formData);

      //서버전송 GET : 패킷(header) : url => axios.get()  ==> /:id 
      //서버전송 POST : 패킷(body) => axios.post()
      
      //post로 보냄
      const url = 'http://127.0.0.1:8080/member/login';
      axios({
        method:'POST',
        url: url,
        data: formData
      })
        .then((res)=>{// controller에서 보낸 result값이 res에 들어감
          if(res.data.cnt ===1) {
						console.log('token->', res.data.token);

						//쿠키에 토큰 저장
						cookie.setCookie('x-auth-jwt', res.data.token);

						//토큰에서 userInfo 정보를 로컬스토리지에 저장
						const userInfo = jwtDecode(res.data.token);
						// alert(JSON.stringify(userInfo));
						localStorage.setItem("userInfo", JSON.stringify(userInfo)); 


            alert('로그인 성공!')
            navigate("/");
          }else{
            alert('로그인 실패, 다시 입력하세요')
            // userIdRef.current.value ="";
            // userPassRef.current.value ="";
            setFormData({userId:'',userPass:''});//초기화
            userIdRef.current.focus();
          }
        })
        .catch(error => console.log(error));

    }
  }

  //validataionCheck()
  const validataionCheck = () => {
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
  

    return (
      <div className='content'>
        <div className='login'>
          <h2>SHOPPY LOGIN</h2>
          <form className='login-form' onSubmit={handleSubmit}>
            <ul>
              <li>
                <label>아 이 디</label> 
                <input type="text" name="userId" 
                        ref = {userIdRef}
                        value={formData.userId} onChange={handleChange}/>
              </li>
              <li>
                <label>패스워드</label> 
                <input type="password" name="userPass" 
                        ref = {userPassRef}
                        value={formData.userPass} onChange={handleChange}/>
              </li>
              <li>
                <button type="submit">Login</button>
                <button type="button">Reset</button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
}


