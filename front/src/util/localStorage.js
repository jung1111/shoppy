import {getCookie, removeCookie} from './cookies.js'

export const getUser = () => {
	let userInfo = localStorage.getItem('userInfo') && getCookie('x-auth-jwt') //x-auth-jwt 쿠키에 저장되는 이름, 아무거나 사용가능
			? JSON.parse(localStorage.getItem('userInfo'))	//userInfo와 x-auth-jwt를 비교해서 같으면
			: null; // 다르면 null
	return userInfo;
}

export const removeUser = () => {
	removeCookie('x-auth-jwt');
	localStorage.clear();
}