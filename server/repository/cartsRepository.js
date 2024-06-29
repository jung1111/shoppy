import {promises as fsPromises} from 'fs';
import {db} from '../db/database_mysql80.js';



/* 장바구니 count */
export const getCount = async(userId) => {
	const sql = `
		select sum(qty) count from shoppy_cart
			where user_id = ?
	`;
	return db
		.execute(sql, [userId])
		.then(result => result[0][0]); // {count: 4} app.js에서 값을 받는다

}


// 장바구니 체크 : pid, size가 동일한 데이터 체크
export const cartCheck = async(items) => {
	const sql = `
		select count(cid) cnt, cid from shoppy_cart
			where pid = ? and size = ?
			group by cid
	`;
	return db
			.execute(sql, [items.pid, items.size])
			.then(result => result[0][0])  // result= 1차원배열, result[0]=2차원배열 , result[0][0]= {cnt:1, cid:9} 2차원배열안의 json객체에 접근;

}


// 장바구니 추가
export const insert = async(items) => {
	//cartCheck 함수를 통해 pid, size가 동일한 데이터 체크
	const checkResult = await cartCheck(items);
	// console.log('checkResult-->>>>',checkResult);

	let result_rows = 0;
	let sql = `

	`;


	//데이터가 없으면(undefined) insert(cnt:1), 없으면 (cnt:0)
	if(checkResult === undefined) {
		//insert
		sql = `
			insert into shoppy_cart(pid, size, cdate, user_id)
				values(?,?,now(), ?)
		`;
		const [result] = await db.execute(sql, [items.pid,items.size, items.userId]);
		result_rows = result.affectedRows;
	}else {
		//update
		//cid에 result_rows 들어감
		sql = `
			update shoppy_cart
				set qty = qty + 1
				where cid = ?
		`;
		const [result] = await db.execute(sql, [checkResult.cid]);
		result_rows = result.affectedRows;
	}
	return {cnt : result_rows}; //detail 페이지로 값이 넘어감

};

/* 장바구니 리스트 */
export const getCarts = async(userId) => {
	const sql = `
		select row_number() over(order by sc.cdate desc) as rno,
			sp.image,
			sp.name,
			sp.info,
			sc.size,
			format(sp.price, 0) as price,
			sc.qty,
			sc.cid,
			sc.pid
		from shoppy_cart sc, shoppy_product sp
			where sc.pid = sp.pid and user_id = ?
	`;
	return db.execute(sql, [userId])
					.then(result => result[0])
}


