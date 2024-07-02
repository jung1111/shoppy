import { createSlice } from '@reduxjs/toolkit'

//공유데이터
const initialState = {
  isLogin : false
}


const memberReducer = createSlice({
  name : 'member',
  initialState,
  reducers: {
    setIsLogin(state, action){
      if(action.payload.cnt === 1 ) {
        state.isLogin = true;
        alert('로그인 성공!!!')
      }
    },
    setIsLogout(state, action){
      state.isLogin = false;
    }
  }

})

export const { setIsLogin, setIsLogout } = memberReducer.actions
export default memberReducer.reducer;