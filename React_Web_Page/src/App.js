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

const App = () => {
   const [isLoggedIn, setLoggedIn] = useState(false);

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
         <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer isLoggedIn={isLoggedIn}/>
      </BrowserRouter>
   </div>
   );
};

export default App;