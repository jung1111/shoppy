import { setCartItem, setCartList, setCount, resetCartCount } from "../reducers/cartsReducer";
import { axiosGet, axiosPost } from "./reduxAxios";


// 로그아웃 reset
export function logoutCount() {
  return(dispatch) => {
    dispatch(resetCartCount());
  }
}

// 카트 count
export function getCount({userId}){
  const url = "http://127.0.0.1:8080/carts/count";
  const data = {'userId': userId}

  return async(dispatch) => {
    const carts = await axiosPost({url, data}); 
    const count = carts.count;
    dispatch(setCount({count}));
  }
}

// 카트 리스트
export function cartListAxios({userId}){
  const url = "http://127.0.0.1:8080/carts";
  const data = {'userId': userId};

  return async(dispatch) => {
    const clist = await axiosPost({url, data})
    dispatch(setCartList({clist})); 
  }

}

// 카트 추가
export function cartItemAdd({id, size, userId}) {
    const url = `http://127.0.0.1:8080/carts/add`;
    const data = {
      pid: id, size: size, userId:userId};

    return async(dispatch) => {
      const cnt = await axiosPost({url, data})
      dispatch(setCartItem(cnt));
    }
}