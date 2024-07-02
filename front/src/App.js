import './css/style.css';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import MyCart from './pages/MyCart';
import NewProduct from './pages/NewProduct';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DetailProduct from './pages/DetailProduct';
import Root from './pages/Root';
import BoardList from './pages/BoardList';
import BoardContent from './pages/BoardContent';
import BoardUpdate from './pages/BoardUpdate';
import BoardDelete from './pages/BoardDelete';
import BoardWrite from './pages/BoardWrite';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getUser, removeUser } from './util/localStorage';



export default function App() {
  const userInfo = getUser();
	// useState 장점  리액트에서 사용하는 모든페이지에 리액트가 알아서 랜더링해줌, 값이 계속 바뀔때 사용
  const [cartCount, setCartCount] = useState(0);//카트갯수 카운트
  const [cartItems, setCartItems] = useState([]);//카드리스트 데이터
  

   //cartItem 삭제
   const removeCartItem = (cid, qty) => {
    const removeIndex = cartItems.findIndex(item => item.cid === cid);
    const updateCartList = cartItems.filter((item, i) => i !== removeIndex );
    setCartItems(updateCartList);
    setCartCount(cartCount-qty);
  }


  //장바구니 갯수 추가
	//detailProduct에서 처리한 장바구니 추가 결과 가져오기
  const addCartCount = (result) => {
    // console.log('addCartCount->>', result);  // 결과값 1 이면
    if(result === 1) setCartCount(cartCount + 1);

  }
  
  
    // 로그인 성공 시 처리한 장바구니 추가 결과 가져오기
    const addLoginCartCount = (result) => {  
      console.log('addLoginCartCount ==> ', result);
      setCartCount(result);
    }
 

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root cartCount={cartCount} />, //header.jsx
      children: [
        {path: "/", element: <Home />,},
        {path: "/products",element: <AllProducts />,},
        {path: "/products/:id",element: <DetailProduct addCartCount={addCartCount} />, },
        {path: "/carts", element: <MyCart cartItems={cartItems} removeCartItem={removeCartItem} />, },
        {path: "/products/new", element: <NewProduct />, },
        {path: "/login",element: <Login count={addLoginCartCount} />,},
        {path: "/signup",element: <Signup />,},
        {path: "/board",element: <BoardList />,},
        {path: "/board/:bid/:rno",element: <BoardContent />,},
        {path: "/board/update/:bid/:rno", element: <BoardUpdate />,},
        {path: "/board/delete/:bid/:rno",element: <BoardDelete />,},
        {path: "/board/new",element: <BoardWrite />,}
      ],
    },
  ]);
  
  return (
    <RouterProvider router={router}/>
  );
}

