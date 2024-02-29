/**
 * 3-1
 * 진행 사항:
 * 계속해서 렌더링이 두번 되는 문제를 해결했다.
 * React.StrictMode가 wrap 되어있어 풀어주었다.
 * StrictMode는 디버깅하는 과정이라 생각하면 되서 이 기능을 빼고 작성하게 했다.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
