import * as repository from '../repository/memberRepository.js'



// 가입완료 버튼 -> submit 전송
export const getSignup = async (req, res) => {
	const formData = req.body;
	const result = await repository.getSignup(formData);
	res.json(result);
	res.end();
}

//로그인 처리
export const getLogin = async (req, res) => {
    //비동기식 - async,await
    const {userId, userPass} = req.body;
    const result = await repository.getLogin(userId, userPass); //{cnt:1}
    //모든 데이터는 json으로 넘어간다.
    res.json(result);
    res.end();
}

//아이디 중복체크 
export const getIdCheck = async (req, res) => {
    const {userId}= req.body;//post로 받기 때문에...
    const result = await repository.getIdCheck(userId);
    res.json(result);
    res.end();
}
