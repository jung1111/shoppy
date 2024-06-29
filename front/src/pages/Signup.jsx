import React, { useState } from 'react';
import SignupStep1 from '../component/SignupStep1';
import SignupStep2 from '../component/SignupStep2';
import SignupStep3 from '../component/SignupStep3';




export default function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({service: false,personal:false,
    /* step2 데이터 */userId:'',userPass:'',userPass:'',userName:'',emailId:'',emailDomain:'',phoneNumber1:'010',phoneNumber2:'',zipcode:'',address:'',detailAddress:''});//기본값


  //! step2에서 발생하는 폼의 이벤트가 발생하면 부모에서 처리 
    //상세주소는 handleChange로 입력
    const handleChange = (e) => {
      const {name, value} = e.target;
      setFormData({...formData,[name]:value});
    }



    //DaumPostcode에서 값을 받아오는 함수
    //검색을 통해서 주소검색이 완료되면 이벤트 발생
    //값을받을때
    const handleAddress = (e) => {
      setFormData({...formData, zipcode:e.zipcode, address:e.address});
    }




  //! step1에서 체크박스 이벤트가 발생하면 부모에서 처리
  // const handleCheckService = () => {
  //   setFormData({...formData, service:!formData.service})
  // }
  // const handleCheckPersonal = () => {
  //   setFormData({...formData, personal:!formData.personal})
  // }
  //! step1!!!!!!!!!!!
  // 체크박스 함수 한개로 관리하기 -> service, personal 구별하기 -> 파라미터로 받기(대괄호 사용)
  const handleCheck = (type, isChecked) => {
    if(type==="all"){
      //service, personal --> ischecked 값으로 치환
      setFormData({...formData, service:isChecked, personal:isChecked})
    }else {
      setFormData({...formData, [type]:!formData[type]})
    }    
  }

  const nextStep = () => {
    setStep(step + 1);
  }

  const preStep = () => {
    setStep(step - 1);
  }


    
    return (
      <div className='content'>
        { step === 1 && (
          <SignupStep1 next={nextStep} formData={formData} handleCheck={handleCheck} />        
        ) }
        { step === 2 && (
          <SignupStep2 pre={preStep} next={nextStep} formData={formData} handleChange={handleChange} handleAddress={handleAddress}/>//handleAddress보내면  step2에서 받음
        ) }
        { step === 3 && (
          <SignupStep3/>        
        ) }
      </div>
    );
}
