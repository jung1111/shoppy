import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function ErrorPage(){
		const navigate = useNavigate();
		const handleClick = () => {
			navigate('/');
		}
		return (
		<div>
			<img src='https://colorlib.com/wp/wp-content/uploads/sites/2/404-error-page-templates.jpg'/>
			<button type='button' onClick={handleClick}>홈으로</button>
		</div>
	);
}