import {promises as fsPromises} from 'fs';
import { db } from '../db/database_mysql80.js';


// 조회수 업데이트
export const updateHits = async(bid) => {
	let result_rows = 0;
	const sql = `
		update shoppy_board
			set bhits = bhits + 1
			where bid = ?
	`;
	try {
		const [result] = await db.execute(sql, [bid]);
		result_rows = result.affectedRows;
	} catch (error) {
		console.log(error);
	}
	return {cnt: result_rows};
}

// 게시글 삭제하기
export const bidDelete = async(bid) =>{
	let result_rows = 0;
	const sql = `
		delete from shoppy_board where bid = ?
	`;
	try {
			const [result] = await db.execute(sql , [bid]);
			result_rows = result.affectedRows;
	} catch (error) {
			console.log(error);
	}
	return{ cnt : result_rows};
}

// 게시글 업데이트(수정완료 버튼 클릭)
export const update = async (boardFormData) => {  
	let result_rows = 0; //cnt :0 또는 cnt :1로 넘기는 변수
	const params = [
		boardFormData.btitle,
		boardFormData.bcontent,
		boardFormData.bid
	]
	const sql = `
		update shoppy_board
			set btitle = ? , bcontent = ? 
			where bid = ?
	`;
	//기존것 그대로 업데이트 하면됨. 체크할 필요없음
	try {
		const [result] = await db.execute(sql, params);
		result_rows = result.affectedRows;
	} catch (error) {
		console.log(error);
	}
	return {cnt : result_rows} // 결과값을 boardUpdate가 받음
}


//게시글 상세페이지
export const detail = async (bid) => {
	const sql = `
		select bid, btitle, bcontent, bhits, cast(bdate as char) bdate
			from shoppy_board
			where bid = ?
	`;

	return db	
					.execute(sql, [bid])
					.then(result => result[0][0]);

}


//게시글 전체 리스트
export const list = async(params) => {
	const sql = `
	select rno, bid, btitle, bhits, bdate, total from
		(select row_number() over (order by bdate desc) as rno, 
			bid, btitle, bhits, left(bdate, 10) as bdate,
    	(select count(*) from shoppy_board) total
			from shoppy_board) sb1
		where rno between ? and ?
	`;
	return db
				.execute(sql, [params.startIndex, params.endIndex])
				.then(result => result[0]);

}

// 게시글 등록
export const insert = async(boardFormData) => {
	let result_rows = 0;
	const sql = `
		insert into shoppy_board(btitle, bcontent, bhits, bdate)
			values(?,?,0, now())
	`; 

	try {
		const [result] = await db.execute(sql, [boardFormData.btitle, boardFormData.bcontent])
		result_rows = result.affectedRows;
	} catch (error) {	
			console.log(error);
	}
	return {cnt : result_rows};

}