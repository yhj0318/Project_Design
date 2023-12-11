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
 */
import React, { Component } from 'react';
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

const App = () => {
	return (
	<div className='App'>
		<BrowserRouter>
		<ScrollToTop/>
		<Header/>
		<Routes>
			<Route path="/" element={<Main />}></Route>
			<Route path='/service' element={<Service />}></Route>
			<Route path='/information' element={<Information />}></Route>
			<Route path='/edit_law' element={<Edit_law />}></Route>
			<Route path='/consulting_review' element={<Consilting_review />}></Route>
			<Route path='/help' element={<Help />}></Route>
			<Route path='/login_sign' element={<Login_sign />}></Route>
			<Route path='/consulting' element={<Consulting />}></Route>
			<Route path='/sign' element={<Sign />}></Route>
			<Route path="*" element={<NotFound />}></Route>
		</Routes>
		<Footer/>
		</BrowserRouter>
	</div>
	);
};

export default App;