
/**
   * 이메일 주소 선택 
   */
export const changeEmailDomain = (e, refs, handleChange) => {
  const name = e.target.name;  //emailDomain
  const value = e.target.value; //naver.com

  if(value === "self") {
    refs.emailDomainRef.current.value = "";
    refs.emailDomainRef.current.focus();
  } else {
    refs.emailDomainRef.current.value = value;
    handleChange(e);
  }
}

/**
   * passCheck : 비밀번호 && 비밀번호 확인 체크
   */
export const passCheck = (refs) => {
  let checkFlag = true;
  const pass = refs.userPassRef.current;
  const passCheck = refs.userPassCheckRef.current;

  if(pass.value !== passCheck.value){
    alert("비밀번호가 동일하지 않습니다. 다시 입력해주세요");
    pass.value = "";
    passCheck.value = "";
    pass.focus();
    checkFlag = false;
  } else {
    alert("비밀번호가 동일합니다.");
  }

  return checkFlag;
}


/**
   * step2 : 사용자 정보입력
   * validateCheckStep2 : 유효성 체크
   */
export const validateCheckStep2 = (refs) => {
  let checkFlag = true;
  const userId = refs.userIdRef.current;

  if(userId.value === "") {
    alert("아이디를 입력해주세요");
    userId.focus();
    checkFlag = false;
  }else if(refs.userPassRef.current.value === ""){
    alert("비밀번호를 입력해주세요");
    refs.userPassRef.current.focus();
    checkFlag = false;
  }else if(refs.userPassCheckRef.current.value === ""){
    alert("비밀번호 확인을 입력해주세요");
    refs.userPassCheckRef.current.focus();
    checkFlag = false;
  }else if(refs.userNameRef.current.value === ""){
    alert("이름을 입력해주세요");
    refs.userNameRef.current.focus();
    checkFlag = false;
  }else if(refs.emailIdRef.current.value === ""){
    alert("이메일 아이디를 입력해주세요");
    refs.emailIdRef.current.focus();
    checkFlag = false;
  }else if(refs.emailDomainRef.current.value === ""){
    alert("이메일 주소를 입력해주세요");
    refs.emailDomainRef.current.focus();
    checkFlag = false;
  }else if(refs.phoneNumber2Ref.current.value === ""){
    alert("휴대폰 뒷자리를 입력해주세요");
    refs.phoneNumber2Ref.current.focus();
    checkFlag = false;
  }

  return checkFlag;
}



/**
   * handleFocus() : 포커스에 따라 outline 삭제
   */
export const handleFocus = (type) => {
  if(type === "service"){
    document.getElementById("service").style.outline = "none";
  } else if(type === "personal") {
    document.getElementById("personal").style.outline = "none";
  } else if(type === "all") {
    document.getElementById("service").style.outline = "none";
    document.getElementById("personal").style.outline = "none";
  }
}

/**
  *  step1 단계 : 약관동의 
   * validateCheck() : 유효성 체크 - service, personal 체크박스 
   */
export const validateCheckStep1 = (next, formData) => {
  // console.log('step==>> ',formData);
  if(!formData.service) {
    alert("서비스 약관에 동의해주세요");
    document.getElementById("service").style.outline = "1px solid red";
  } else if(!formData.personal) {
    alert("개인정보 이용 약관에 동의해주세요");
    document.getElementById("personal").style.outline = "1px solid red";
  } else {
    next();
  }
}