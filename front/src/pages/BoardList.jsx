import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
//paging navigation
import Pagination from 'rc-pagination';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-pagination/assets/index.css';
//로그인 체크
import {getUser} from '../util/localStorage.js';
import ErrorPage from './ErrorPage.jsx';

export default function BoardList() {
	//로그인 체크
	const userInfo = getUser();

	//db에 등록된 게시글 출력
	const [boardList, setBoardList] = useState([]);
	const navigate = useNavigate();

	//paging -현재페이지, 전체행수, 페이지사이즈(한페이지당 rows수)
	const [currentPage, setCurrentPage] = useState(1);// 첫번째 페이지 디폴트
	const [totalCount, setTotalCount] = useState(0);// 몇페이지인지 구하는 변수
	const [pageSize, setPageSize] = useState(3);//한페이지 row갯수


	//DB연동 - 게시글 리스트 가져오기 - 페이징처리
	//useEffect가 먼저 한번 실행됨
	//db에서 total 값 포함한 결과값이 result에 있다. 
	useEffect(()=> {	
		// startIndex, endIndex
		let startIndex = 0;
		let endIndex = 0;
		startIndex = (currentPage - 1) * pageSize + 1; //startIndex 값 구하는 공식
		endIndex = currentPage * pageSize; //endIndex 공식
		// 1페이지 : 1*3 , 2페이지 : 4*6

		const url  = 'http://localhost:8080/board/list';
			axios({
				method : 'post',
				url:url,
				data: {'startIndex':startIndex,'endIndex':endIndex}
			})
			.then((result)=> {
				setBoardList(result.data);
				setTotalCount(result.data[0].total)
			})
			.catch(error => console.log(error));
	},[currentPage]);

	// console.log('BoardList-> ',boardList);




	// 조회수 업데이트 > 게시글 상세보기
	const handleUpdateHits = (bid, rno) => {
		// alert('bid->>>'+ bid);
		try {
			//1. 조회수 업데이트
			const url = 'http://localhost:8080/board/updateHits';
			axios({
				method: 'post',
				url: url,
				data:{ "bid" : bid}
			})
			.then(result => {
				//2. 조회수 업데이트 성공시 상세보기로 이동
				if(result.data.cnt === 1 ) navigate(`/board/${bid}/${rno}`);
			})
			.catch(error => console.log(error));
		} catch (error) {
			console.log(error)
		}



	}

  return(
		<>
		{
			userInfo ? (
			<div className='content'>
        <h1>게시판</h1>
        <table border="1">
            <tr>
                <td colSpan={4}>
                   <Link to='/board/new' boardList={boardList}>
                        <button type='button'>글쓰기</button>
                   </Link>
                </td>
            </tr>
            <tr>
                <th>번호</th>
                <th>제목</th>
                <th>조회수</th>
                <th>등록일자</th>
            </tr>
						{
							boardList.map((item)=>(
								<tr>
										<td>{item.rno}</td>
										{/* <td><Link to={`/board/${item.bid}/${item.rno}`}>{item.btitle}</Link></td> */}
										<td>
											<span onClick={() => handleUpdateHits(item.bid, item.rno)}>{item.btitle}</span>						
										</td>
										<td>{item.bhits}</td>
										<td>{item.bdate}</td>
								</tr>
							))
						}
                  
        </table>
				{/* 페이징 컴포넌트 */}
				<Pagination className='d-flex justify-content-center' 
										current ={currentPage} total ={totalCount} pageSize = {pageSize} onChange={(page)=> setCurrentPage(page)}/>
    	</div>
		
			):(
				//비정상적인 방식으로 접근한 경우
				<ErrorPage/> //NotFound
			)
			
		}
		</>
   
  );
}
