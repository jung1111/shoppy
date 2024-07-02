import React, { useEffect } from 'react';
import {FiShoppingBag} from 'react-icons/fi';
import {BsFillPencilFill} from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import {getUser, removeUser} from '../util/localStorage.js';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLogout } from '../modules/reduxMemberAxios.js'
import { getCount, logoutCount } from '../modules/reduxCartsAxios.js'


export default function Header({cartCount}) {
	const dispatch = useDispatch()
	const navigate = useNavigate();
	const userInfo = getUser();
	const count = useSelector(state => state.carts.count)
	const isLogin = useSelector(state => state.member.isLogin)


	// 카트 count
	useEffect(()=>{
		if(isLogin || userInfo !== null){
			const userId = userInfo.userId;
			dispatch(getCount({userId}));
		}

	},[isLogin])

	// 로그아웃
	const handleLogout = () => {
		dispatch(logoutCount());
		dispatch(getIsLogout());
		removeUser();
		alert('로그아웃 되었습니다.')
		navigate('/');
	}

  return(
    <div className='header-outer'>
    <div className='header'>
      {/* home으로 이동 */}
        <Link to="/" className='logo'>
          <FiShoppingBag/>
          <span>shoppy</span>
        </Link>
        <nav className='nav'>
					{/* userInfo ? (로그인 성공) : (로그인 실패) -> jsx문법은 그대로 출력할때 ()로 묶는다. 안에 빈태그 넣어주기 */}
					{userInfo ? 
						(
							<>
								{/* 로그인 성공 */}
								{userInfo.userId}<span>님</span>
								<button type='button' onClick={handleLogout}>로그아웃</button>
								<Link to="/products">products</Link>
								<Link to="/carts">MyCart ({count})</Link>
								<Link to="/board">
									<button type="button">board</button>
								</Link>
								<Link to="/products/new">
									<BsFillPencilFill/>
								</Link>  
							</>					
						) : (
							<>
								{/* 로그인 실패, default일때 */}
								<Link to="/carts">MyCart ({count})</Link>
								<Link to="/login">
									<button type="button">login</button>
								</Link>
								<Link to="/signup">
									<button type="button">signup</button>
								</Link>	
								<Link to="/notice">
									<button type="button">notice</button>
								</Link>						
							</>
						)	
						
					}        
        </nav>
    </div>
    </div>
  );
}
