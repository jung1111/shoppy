import { createSlice } from '@reduxjs/toolkit';

// 공유데이터
const initialState = {
  list : [],
  item : {},
  page : 1
}


// 리듀서 생성함수
const productsReducer = createSlice({
  name: 'products', // 스토어에 정의되는 이름
  initialState,
  reducers: {
    setProductList(state, action) {
      state.list = action.payload.plist;
      state.page = action.payload.currentPage;
    },
    setItem(state, action) {
      state.item = action.payload.item;
    }
  }
})


export const { setProductList, setItem } = productsReducer.actions;
export default productsReducer.reducer;