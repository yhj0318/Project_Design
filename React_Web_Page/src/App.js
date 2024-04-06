/**
 * 11-23
 * 진행 사항 : 
 * 웹 페이지 구분을 위한 React_Router_Dom을 설치
 * Header.js -> 웹 페이지 상단 카테고리를 표시하기 위한 파일
 * Main.js -> 메인 페이지를 보여주는 파일
 * NotFound.js -> 올바르지 못한 경로로 갔을 때 보여주는 파일
 * Service.js -> 서비스소개 페이지로 이동
 * Information.js -> 법률 정보 공개 페이지로 이동
 * Edit_law.js -> 개정법안 페이지로 이동
 * Consulting_review.js -> 상담후기 페이지로 이동
 * Help.js -> 고객센터 페이지로 이동
 * Login_sign -> 로그인/가입 페이지로 이동
 * js, css파일 세분화를 진행
 * Mid-content 카테고리별 변호사 상담분류
 * 각 페이지로 이동을 하기위해 App.js에 import하고 파일을 만들어야 함
 * 각 파일안에서 파일로 이동을 위해 <Link>태그를 사용
 * 
 * 11-26
 * node.js 업데이트 진행
 * 부트스트랩 설치
 * Consulting.js -> 상담페이지로 이동
 * 부트스트랩 아이콘으로 이미지 삽입
 * hover될 때 효과주기
 * Mid-content 완료
 * 
 * 해야할 일:
 * 1. 메인 페이지 구성 -> 11-26 review-content 하는중
 * 2. 검색 기능 구현
 * 3. 배너 넘어가는 기능 구현
 * 
 * 1-11 
 * 진행 사항:
 * redux, react-redux, redux-thunk, redux-promise 설치
 * 
 * 1-14
 * 진행 사항:
 * App.js에 상태를 두어 로그인과 로그아웃이 수행 됐을 경우 헤더에 변경사항이 표시되도록 만들었다.
 * 
 * 1-15
 * 진행 사항:
 * 풋터에도 마찬가지로 로그인과 로그아웃이 수행 됐을 경우 논리값에 따라 바뀌도록 표시했다.
 * 
 * 2-8
 * 진행 사항:
 * 새로고침을 하면 로그인이 풀리는 문제를 발견해서 문제를 해결하고자 useEffect로 쿠키값을 항상 조회하여 그 값이 있다면 로그인이 유지되도록 만들었다.
 * 
 * 3-17
 * 진행 사항:
 * 마이페이지를 만들었다.
 * 
 * 4-1
 * 진행 사항:
 * 챗봇 기능을 사용하기 위해 react-chatbot-kit 라이브러리를 설치했다.
 * config, MessageParser, ActionProvider를 정의했다.
 * 
 * 4-6
 * 진행 사항:
 * 좌측하단에 챗봇상담을 클릭하면 챗봇이 켜지도록 상태를둬서 만들었다.
 */
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main';
import NotFound from './NotFound';
import Service from './Service';
import Header from './Header';
import Information from './Information';
import Edit_law from './Edit_law';
import Consilting_review from './Consulting_review';
import Help from './Help';
import Login_sign from './Login_sign';
import Consulting from './Consulting';
import Sign from './Sign';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import CreatePost from './CreatePost';
import ViewPost from './ViewPost';
import SearchPost from './SearchPost';
import MyPage from './MyPage';
import Reserve from './Reserve';
import {Chatbot} from 'react-chatbot-kit';
import config from './config.js';
import MessageParser from './MessageParser.jsx';
import ActionProvider from './ActionProvider.jsx';

const App = () => {
   const [isLoggedIn, setLoggedIn] = useState(false);
   const [toggle, setToggle] = useState(false);
   
   useEffect(() => {
      const cookies = document.cookie.split(';');
      for(let i = 0; i < cookies.length; i++){
         const cookie = cookies[i].trim();
         if(cookie.startsWith('x_auth' + '=')){
            setLoggedIn(true);
         }
      }
   },[]);

   const handleLogin = () => {
      // 로그인 로직 수행 후 로그인이 성공하면 상태 업데이트
      setLoggedIn(true);
   };

   const handleLogout = () => {
      // 로그아웃 로직 수행 후 로그아웃이 성공하면 상태 업데이트
      setLoggedIn(false);
   };

   return (
   <div className='App'>
      <BrowserRouter>
      <ScrollToTop/>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
      <Routes>
         <Route path="/" element={<Main />}></Route>
         <Route path='/service' element={<Service />}></Route>
         <Route path='/information' element={<Information />}></Route>
         <Route path='/edit_law' element={<Edit_law />}></Route>
         <Route path='/consulting_review' element={<Consilting_review />}></Route>
         <Route path='/help' element={<Help />}></Route>
         <Route path='/login_sign' element={<Login_sign handleLogin={handleLogin}/>}></Route>
         <Route path='/consulting' element={<Consulting />}></Route>
         <Route path='/sign' element={<Sign />}></Route>
         <Route path='/createPost' element={<CreatePost />}></Route>
         <Route path='/viewPost/:id' element={<ViewPost />}></Route>
         <Route path='/searchPost/:searchTerm' element={<SearchPost />}></Route>
         <Route path='/mypage/' element={<MyPage />}></Route>
         <Route path='/reserve/:lawyerId' element={<Reserve />}></Route>
         <Route path="*" element={<NotFound />}></Route>
      </Routes>
      {toggle && (
         <Chatbot
         config={config}
         messageParser={MessageParser}
         actionProvider={ActionProvider}
         />
      )}
      <div className='app-chatbot-button' onClick={() => setToggle((prev) => !prev)}>
         <svg xmlns="http://www.w3.org/2000/svg"fill="currentColor" class="consulting-icons" viewBox="0 0 16 16">
            <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z"/>
            <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z"/>
         </svg>
         <span className='app-chatbot-content'>챗봇상담</span>
      </div>
      <Footer isLoggedIn={isLoggedIn}/>
      </BrowserRouter>
   </div>
   );
};

export default App;