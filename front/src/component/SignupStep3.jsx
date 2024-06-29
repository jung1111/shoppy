import {Link, useNavigate} from 'react-router-dom'
/**
* step3 :  가입완료
*/
export default function SignupStep3() {
    const navigate = useNavigate();

    const hadleLogin = () => {
        navigate('/login')
    }

    return (
      <div className="signup" style={{textAlign:'center'}}>
        <h2>SHOPPY SIGNUP</h2> 
        <img src="https://img.etnews.com/news/article/2014/06/18/techholic_18080012860375.jpg"/>
        <p>회원가입에 성공하셨습니다.</p>
        
        {/* <Link to="/login"> */}
            <button type="button" onClick={hadleLogin}>로그인</button> 
        {/* </Link>         */}
      </div>
    );
}
