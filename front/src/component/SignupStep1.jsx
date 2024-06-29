import { validateCheckStep1, handleFocus } from "../apis/validate.js";

/**
* step1 : 약관동의
*/
export default function SignupStep1({next, formData, handleCheck}) {

  
    return (
      <div className='signup'>
        <h2>SHOPPY SIGNUP</h2>
        <div>
          <h3>약관동의</h3>
          <p>회원가입에 필요한 약관에 동의해주세요</p>
        </div>  
        <div>
          <div>
            <input type="checkbox" onChange={(e)=> handleCheck("all",e.target.checked)} onFocus={()=>handleFocus("all")}/>
            <span>모두 동의합니다.</span>
          </div>
          <div>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum vel, vero delectus, voluptas nemo vitae maiores tempore blanditiis sapiente non aut quod soluta tempora sed commodi dolorum nisi! Magnam, ut!</p>
          </div>
          <div>
            <h4>서비스 약관 동의</h4>
            <textarea>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae nostrum minima, saepe quibusdam modi beatae iusto nam maxime officiis libero at, iste sunt possimus perferendis, itaque magni quas doloremque eum?</textarea>
          </div>
          <div>
            <input id="service" type="checkbox" name="service" checked={formData.service} onChange={()=> handleCheck("service")}
              onFocus={()=>handleFocus("service")} />{/* 콜백함수로 service 호출 */}
            
            <span>동의합니다.</span>
          </div>
          <div>
            <h4>개인정보 수집 및 이용 동의</h4>
            <textarea>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae nostrum minima, saepe quibusdam modi beatae iusto nam maxime officiis libero at, iste sunt possimus perferendis, itaque magni quas doloremque eum?</textarea>
          </div>

          <div>
            <input id="personal" type="checkbox" name="personal" checked={formData.personal} onChange={()=> handleCheck("personal")}
              onFocus={()=>handleFocus("personal")}/>
            <span>동의합니다.</span>
          </div>

        </div>
          <button type="button" onClick={()=>validateCheckStep1(next, formData)}>다음</button>  
        </div>
      
    );
}