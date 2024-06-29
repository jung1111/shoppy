import {db} from '../db/database_mysql80.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



//회원가입
//가입완료 버튼 --> submit 전송
export const getSignup = async (formData) =>{
  let result_rows = 0;
	//phone : '010-1234-1234'
	//phone 번호 3~4 자릿수 자르고, concat으로 '-' 문자열 합치기
	let phone1 = formData.phoneNumber1;
	let phone2 = '';
	let phone3 = '';

	if(formData.phoneNumber2.length === 8){
		phone2 = formData.phoneNumber2.slice(0, 4); // 0 ~ 3 까지, 4자릿수
		phone3 = formData.phoneNumber2.slice(4); // 3부터 나머지
	}
	else{
		phone2 = formData.phoneNumber2.slice(0, 3); //3자릿수
		phone3 = formData.phoneNumber2.slice(3); 
	}
	console.log('formData ->', formData);
	console.log('phone ->', phone1.concat('-',phone2,'-',phone3));


	// const hpass = bcrypt.hashSync(formData.userPass, 7);
	// console.log('hash->',hpass);
	// console.log('length->',hpass.length);


	//테이블 데이터 값
	const params = [
		formData.userId,
		bcrypt.hashSync(formData.userPass, 7),
		formData.userName,
		formData.emailId,
		formData.emailDomain,
		phone1.concat('-',phone2,'-',phone3),
		formData.zipcode,
		formData.address.concat('', formData.detailAddress)
	];

	//db연동 쿼리
	//params에 배열로 데이터 값을 넣어줌. 테이블 생성과 데이터 생성
	const sql = `
		insert into shoppy_member(	user_id,	
																user_pass,
																user_name,
																email_id,
																email_domain,
																phone,
																zipcode,
																address,
																siginup_date
															)
			values(	?, ?, ?, ?, ?, ?, ?, ?, now())
			`;

		try {
			//db에 insert 됨
			const [result] = await db.execute(sql, params);  
			result_rows = result.affectedRows;
			console.log('row', result.affectedRows);
		} catch (error) {
			console.log(error);
		}


	return {'cnt':result_rows};
}


//아이디 중복체크
export const getIdCheck = async (userId) => {
	//DB 쿼리 작성
	//values(	?, ?, ?, ?, ?, ?, ?, ?, now()) 방식 사용 / 프리페어드
	const sql = `
		SELECT COUNT(USER_ID) cnt FROM SHOPPY_MEMBER WHERE USER_ID = ? 
	
	`;
	// catch는 디버깅 할수없어서 안쓴다. (error)
	return db
					.execute(sql, [userId])
					.then((result)=> result[0][0]); //result[rows[{user_id:1}] ->  result[rows[{cnt:1}]  = user_id를 cnt로 변경해줌
					//mysql 결과값 : result가 2차원배열로 리턴 result[rows행[], fields열[]]  ->fields가 컬럼명, rows는 데이터값

	//json 아이디 중복체크
	// try 문법 보다 exeute를 사용하면 간결해짐.
	// try {
	// 	const [result] = await db.execute(sql, params);  
	// 	result_rows = result.affectedRows;
	// 	console.log('row', result.affectedRows);
	// } catch (error) {
	// 	console.log(error);
	// }
	// return {'cnt':result_rows};

    // const did ='test';
    // const result = {};
    // if(did === userId){
    //     result.cnt = 1; //result에 cnt(프로퍼티)가 없으면 result에 추가된다.
    // }else{
    //     result.cnt = 0;
    // }
    // return result;
};


//로그인 처리
export const getLogin = async (userId, userPass) => {
	let login_result = 0; 
	let login_token = '';
	const sql = `
		select count(user_id) cnt, any_value(user_pass) user_pass 
			from shoppy_member
			where user_id = ? 
	`;
	try {
		const [result] = await db.execute(sql, [userId]);
		console.log('result->', result);

		if(result[0].cnt === 1){
	 		if(bcrypt.compareSync(userPass, result[0].user_pass)) login_result = 1; 
		}
		//토큰생성
		 login_token = jwt.sign({userId: userId}, 'cmVhY3QxMjM0');
		// console.log('토큰 생성-', login_token);



	} catch (error) {}

	return {
			cnt : login_result,
			token : login_token
		}; 
}


/* json 로그인 처리
export const getLogin = async (userId, userPass) => {
	let login_result = 0; //id,pass 틀림

	const sql = `
		select count(user_id) cnt, any_value(user_pass) user_pass 
			from shoppy_member
			where user_id = ? 
	`;

	try {
		//const result = await db.execute(sql, [userId]); 2차원배열 리턴

		const [result] = await db.execute(sql, [userId]);//1차원배열 , rows만 리턴
		console.log('result->', result); //[{cnt:1, user_pass:~~}] //result[0].cnt-> {cnt:1, user_pass:~~}

		if(result[0].cnt === 1){
			const passCheck = bcrypt.compareSync(userPass, result[0].userPass); //결과값은 true, false
			//result[0].userPass가 암호화되어있어서 bcrypt로 암호화 한거 풀어서 입력한 pass값과 비교해서 true, false 준다.
			if(passCheck) login_result = 1; //pass값이 맞으면 1을 출력하여 로그인 처리된다.

			//  if(bcrypt.compareSync(userPass, result[0].userPass)) login_result = 1; 코드 줄이기

		}


	} catch (error) {}//login_result = 0;과 같아서 생략.

	return {cnt : login_result}; //기본값 0

}
*/

