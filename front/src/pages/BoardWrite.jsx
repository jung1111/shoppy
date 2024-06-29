import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function BoardWrite() {
    const navigate = useNavigate();
   
    //DB연동한 데이터가 boardFormData에 들어감

    const [boardFormData , setBoardFormData] = useState({
        btitle:'', bcontent:''
    });
  

    // 폼데이터 입력 : onChange 함수
    const handleChange = (e) => {
        const {name, value} = e.target;
        setBoardFormData({...boardFormData,[name]:value});
        
    }

    //등록완료
    const url = "http://127.0.0.1:8080/board/new";
    const handleWriteSubmit = () =>{       
        axios({
            method:'post',
            url:url,
            data:boardFormData
        })
        .then(res => {
					if(res.data.cnt === 1) {
						// alert('게시글 등록 완료')
						//리스트로 이동 , useNavigate로 이동
					navigate('/board');
					}
					

				})
        .catch(error => console.log(error));
    }    
      //등록폼 리셋
      const handleWriteReset = () =>{
        //기본값 넣어주기, reset
        setBoardFormData({
            btitle:'', bcontent:''
        })
      }  
        //리스트 이동
    const handleNavigate = () =>{
       navigate('/board');
        
    }  

  return(
    <div className='content'>
        <h1>글쓰기</h1>
        <table border="1">
            <tr>
                <th>제목</th>
                <td>
                    <input type='text' name='btitle' value={boardFormData.btitle} onChange={handleChange}/>
                </td>
            </tr> 
            <tr>
                <th>내용</th>
                <td>
                    <textarea name='bcontent' value={boardFormData.bcontent}  onChange={handleChange}/>
                </td>
            </tr> 
            <tr>
               
                <td colSpan={2}>
                   <button type='button' onClick={handleWriteSubmit}>등록완료</button>
                   <button type='button' onClick={handleWriteReset}>다시쓰기</button>                  
                   <button type='button' onClick={handleNavigate}>리스트</button>
                </td>
            </tr>          
        </table>
    </div>
  );
}

