import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getIsLogin, validataionCheck } from '../modules/reduxMemberAxios.js';



export default function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const userIdRef = useRef(null);
  const userPassRef = useRef(null);
  const [formData, setFormData] = useState({userId:'', userPass:''});


  //로그인 결과
  const isLogin = useSelector(state => state.member.isLogin);

  useEffect(()=>{
    if(isLogin){
      alert('로그인에 성공했습니다!')
      navigate('/');
    }
  },[isLogin])


  const handleChange = (e) => {
    const {name, value} = e.target;  
    setFormData({...formData, [name]:value});
  }

    //로그인 버튼
  const handleSubmit = (e) => {  
    e.preventDefault();

    if(validataionCheck({formData, userIdRef, userPassRef})){ 
      dispatch(getIsLogin({formData}))
    }
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


