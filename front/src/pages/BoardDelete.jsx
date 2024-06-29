import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


export default function BoardDelete() {
    const navigate = useNavigate();
		const {bid, rno} = useParams();
    

    //삭제완료
    const handleDeleteSubmit = () =>{       
				const url = "http://127.0.0.1:8080/board/delete";
        axios({
            method:'post',
            url:url,
            data: {bid: bid}
        })
        .then(result => {
					if(result.data.cnt === 1) {
						navigate('/board');
					}
				})
        .catch(error => console.log(error));
    }    
    
    //이전페이지, 리스트 이동
    const handleNavigate = (type) =>{
        (type === "list") ? navigate('/board') : navigate(`/board/${bid}/${rno}`);
        
    }  

  return(
    <div className='content'>
        <h1>삭제하기</h1>
        <div>
            <h3>정말로 삭제하시겠습니까?</h3>
            <img src='https://media.istockphoto.com/id/1298957635/ko/%EB%B2%A1%ED%84%B0/%EA%B0%80%EB%B9%84%EC%A7%80-%EB%B9%88-%EC%84%A0-%EB%B2%A1%ED%84%B0-%EC%95%84%EC%9D%B4%EC%BD%98%EC%9E%85%EB%8B%88%EB%8B%A4-%ED%8E%B8%EC%A7%91-%EA%B0%80%EB%8A%A5%ED%95%9C-%EC%8A%A4%ED%8A%B8%EB%A1%9C%ED%81%AC-%ED%94%BD%EC%85%80-%EC%99%84%EB%B2%BD%ED%95%9C-%EB%AA%A8%EB%B0%94%EC%9D%BC-%EB%B0%8F-%EC%9B%B9%EC%9A%A9.jpg?s=612x612&w=0&k=20&c=UMJFB314MvWapHJlHMf_VzGuy6jFo1x_nb8qBxSpTPc=' />
        </div>
        <div>
            <button type='button' onClick={handleDeleteSubmit}>삭제완료</button>
            <button type='button' onClick={()=>handleNavigate('pre')}>이전페이지</button>
            <button type='button' onClick={()=>handleNavigate('list')}>리스트</button>
        </div>
    </div>
  );
}
