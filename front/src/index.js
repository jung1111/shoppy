import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 리덕스
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import productsReducer from './reducers/productsReducer';
import cartsReducer from './reducers/cartsReducer';
import memberReducer from './reducers/memberReducer';



// 스토어 생성
const store = configureStore({
  reducer: {
    products : productsReducer,
    carts : cartsReducer,
    member: memberReducer
  }
})




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
