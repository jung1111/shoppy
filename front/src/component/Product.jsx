import React, { useState, useEffect }  from 'react';
import ProductAvata from './ProductAvata';
import { Link } from 'react-router-dom';

// 리덕스
import { useSelector, useDispatch } from 'react-redux';
import {productList as axiosProductList} from '../modules/reduxProductsAxios';
// as를 사용하면 현재 페이지에서만 쓰는 이름을 정의할 수 있다.

export default function Product() {
  const dispatch = useDispatch();
  // 리듀서의 전역데이터 가져오기
  const productList = useSelector(state => state.products.list);
  const page = useSelector(state => state.products.page);
	const [currentPage, setCurrentPage] = useState(page); //현재페이지

  console.log('currentPage->',currentPage);

  useEffect(() => {
    // 모듈에서 네트워크 연동과 페이징처리 해야됨.
    dispatch(axiosProductList({currentPage})); 
  }, [currentPage]);


  //출력리스트 갯수 설정
  const rows = [];  
  for(let i=0; i < productList.length; i+=3){ // [{0},{1},{2},{3}]  {4}
      rows.push(productList.slice(i, i+3));  // [{0},{1},{2},{3}]
  }

    return (
      <div>
        {rows.map((rowArray, index) => (
          <div key={index} className='product-list'>
            {rowArray.map(product => (
              <Link to={`/products/${product.id}`}>
                <ProductAvata image={product.image}/>
              </Link>
            ))}
          </div>
        ))}
				<button type='button'
					onClick={()=> setCurrentPage(currentPage+1)}>+더보기</button>
      </div>
    );
}

