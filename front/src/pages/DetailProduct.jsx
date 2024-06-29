import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../util/localStorage'
import { productDetail } from '../modules/reduxProductsAxios';
import { cartItemAdd } from '../modules/reduxCartsAxios';


export default function DetailProduct({addCartCount}) { /** GET : url을 통해 넘어오는 파라미터는 useParams hook!!  */
  const dispatch = useDispatch();
  const { id } = useParams();  // 상품아이디
  const product = useSelector(state => state.products.item);

  // const [product, setProduct] = useState({});    
  const [size, setSize] = useState('xs');

  const cnt = useSelector(state => state.carts.cnt);

  // console.log('cnt ->',cnt);


  useEffect(()=>{
    dispatch(productDetail({id, size}))
  }, []);

	
  //장바구니 추가
  const handleAddCart = (id) => {
    const userId = getUser().userId;
    dispatch(cartItemAdd({id, size, userId}))
  }

  // console.log(size)
    return (
      <div className='content'>
        <div className='product-detail'>
          <img src={`http://localhost:8080/${product.image}`} />
          <ul>
            <li className="product-detail-title">{product.name}</li>
            <li className="product-detail-title">{product.price}</li>
            <li className="product-detail-subtitle">{product.info}</li>
            <li>
              <span className='product-detail-select1'>옵션 : </span>
              <select className='product-detail-select2' onChange={(e)=>setSize(e.target.value)}>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </li>
            <li>
              <button type="button" className='product-detail-button' onClick={()=>handleAddCart(product.id)}>장바구니 추가</button>
            </li>
          </ul>
        </div>
      </div>
    );
}