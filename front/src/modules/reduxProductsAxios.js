import { setProductList, setItem } from '../reducers/productsReducer';
import { axiosGet, axiosPost } from './reduxAxios'


// 상품 디테일
export function productDetail({id}){
  const url = `http://127.0.0.1:8080/product/${id}`;

  return async(dispatch) => {
    const item = await axiosGet({url});
    dispatch(setItem({item}));
  }
} 


// 상품 리스트
export function productList({currentPage}) {
  const pageSize = 3;
  let startIndex = 1;// 변동되는 시작페이지
  let endIndex = 0;// 변동되는 끝페이지
  // startIndex = (currentPage-1) * pageSize + 1;
  endIndex = currentPage * pageSize;
  
  return async(dispatch) => {
    try{
      const url = 'http://127.0.0.1:8080/product/all';
      const data = {
        "startIndex" : startIndex,
        "endIndex" : endIndex
      }
  
      const plist = await axiosPost({url, data});
      dispatch(setProductList({plist, currentPage}));
  
        // console.log('plist->', plist); // 리듀서의 list 값이 출려됨.
    } catch(error){
      
    }
  }
}