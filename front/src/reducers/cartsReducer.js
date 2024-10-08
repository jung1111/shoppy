import { createSlice } from "@reduxjs/toolkit";

// 공유데이터
const initialState = {
  list : [],
  count : 0
}

// 리듀서 생성함수
const cartsReducer = createSlice({
  name : 'carts',
  initialState,
  reducers: {
    setCartItem(state, action) {
      if(action.payload.cnt === 1) {
        alert('장바구니에 추가 되었습니다.')
      }
    },
    setCartList(state, action) {
      state.list = action.payload.clist;
    },
    setCount(state, action){
      state.count = action.payload.count;
    },
    resetCartCount(state, action){
      state.count = 0;
    }
  }
})

export const {setCartItem, setCartList, setCount, resetCartCount } = cartsReducer.actions;
export default cartsReducer.reducer;
