import React from "react";
import { useRef, useState } from "react";
import axios from 'axios'
import ImageUpload from "../component/ImageUpload";


export default function NewProduct() {
  /* 
훅을 사용해서 데이터 입력 및 저장 (input name값과 동일하게 작성)
*/
  const refs = {
    nameRef:useRef(null),
    priceRef:useRef(null),
  }
 
	const [image, setImage] = useState(''); //파일업로드 한 이미지 저장
  
	// 파일업로드 파라미터 함수 : getImage
	const getImage = (e) => {
			// console.log(e);
		setImage(e);

	}
	console.log('image => ', image);

/* 
데이터 서버 전송
 */
  const handleSubmit = (e) => {
    e.preventDefault();
		const formData = new FormData(e.target);
		const formDataObject = {}; //json 데이터, useState 대신 사용
		formData.forEach((value, key)=>{
			formDataObject[key] = value;
		});
		console.log('form ->>', formDataObject);


    if(validateCheck()){
      const url = 'http://127.0.0.1:8080/product/new';
      axios({
        method: 'post',
        url: url,
        data: formDataObject,
      })
      .then(res => {
        //const result =  res.data; // {cnt:1}
        if(res.data.cnt === 1){
          alert('상품이 등록되었습니다')
        }
      })
      .catch(error => console.log(error));
    }
    //console.log('submit--> ');
  }

/* 
유효성 체크
*/
  const validateCheck = ()=> {
    let checkFlag = true;
    const name= refs.nameRef.current
    const price = refs.priceRef.current
    if (name.value === ""){
      alert('상품명을 입력해주세요')
      name.focus();
      checkFlag = false;
    }else if (price.value === ''){
      alert('상품가격을 입력해주세요')
      price.focus();
      checkFlag = false;
    }
    return checkFlag
  }

  return (
    <div className="content">
      <h2>New Product</h2>
			<form onSubmit={handleSubmit}>
      <ul>
        {/* <li>
          <label>상품아이디</label>
          <input
            type="text"
            name="id"
            value={newproduct.id}
            onChange={handleChange} //훅이 제어하기때문에 입력창이 막힘 -> onChange의 함수를 통해 입력
            ref={refs.idRef}
          />
        </li> */}
        <li>
          <label>상품명</label>
          <input
            type="text"
            name="name"
            // value={newproduct.name}
            // onChange={handleChange}
            ref={refs.nameRef}
          />
        </li>
        <li>
          <label>상품가격</label>
          <input
            type="text"
            name="price"
            // value={newproduct.price}
            // onChange={handleChange}
            ref={refs.priceRef}
          />
        </li>
        <li>
          <label>상품정보</label>
          <input
            type="text"
            name="info"
            // value={newproduct.info}
            // onChange={handleChange}
          />
        </li>
        <li>
          <label>상품이미지</label>
					<ImageUpload getImage={getImage} /> {/* 파일업로드 버튼 컴포넌트*/}
          <input 
            type="hidden"
            name="uploadImage"
            value={image.uploadImage}
          />
					 <input //db에 전송하기 위한 태그 , handlechange가 안됨. 서버에서 받아오는 값이기 때문에
            type="hidden"
            name="orgImage"
            value={image.orgImage}//image = useState 변수명
          />
        </li>
        <li>
          <button type="submit">등록완료</button> {/* form태그라서 submit */}
          <button type="button">다시쓰기</button>
        </li>
      </ul>
			</form>
    </div>
  );
}