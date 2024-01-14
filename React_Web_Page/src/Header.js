/**
 * 12-06
 * 진행 사항:
 * 로그인 버튼에 Link태그를 달고 페이지 이동을 시킴
 * 
 * 1-14
 * 진행 사항:
 * 로그인이 됐을 때 메인페이지로 돌아와 로그인/가입 버튼을 로그아웃으로 바뀌게 만들고,
 * isLoggedIn, handleLogout 함수를 추가하여 App.js에서 작동하도록 했고, 로그인이냐 아니냐에 따라
 * 헤더에 로그인/가입, 로그아웃으로 나뉘도록 만들었다.
 * 클라이언트에서 쿠키에 대한 정보를 확인할 수 있지만 서버로 전송하려고 하면 자꾸 전송이 안 되서
 * 로그아웃을 하면 데이터베이스에서 토큰 값을 지우지 못 하는 문제가 있다.
 */
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import './Default.css';
import axios from 'axios';

const Header = ({isLoggedIn, handleLogout}) => {
  const logout = async() => {
    try{
      // 현재 서버로부터 전송받은 쿠키값을 확인하고 서버로 전송하는 코드이다.
      const cookies = document.cookie.split(';');
      console.log('cookies is', cookies);
        for(let i = 0; i < cookies.length; i++)
        {
            const cookie = cookies[i].trim();
            if(cookie.startsWith('x_auth' + '='))
            {
              console.log('cookie is = ', cookie);
              const myCookieValue = cookie.split('=')[1];
              console.log('mycookievalue is = ', myCookieValue);
              const response = await axios.get('http://localhost:8080/logout', {
                headers:{
                  Authorization: `Bearer ${myCookieValue}`
                }
              });
              console.log(response);
              handleLogout();
            }
        }
    }
    catch(error){
      console.log('response data is empty error = ', error);
    }
  };

    return (
    <>
    <header class="header">
      <div class="top">
        <div class="top-left">
          <div class="top-title">
            <h2 class="title">
              <Link to="/">프로젝트 제목</Link>
            </h2>
          </div>
          <div class="menu">
            <div class="menu-list">
              <ul class="header-categories">
                <Link to="/service"><li class="header-categorie">서비스 소개</li></Link>
                <Link to="/information"><li class="header-categorie">법률 정보 공개</li></Link>
                <Link to="/edit_law"><li class="header-categorie">개정법안</li></Link>
                <Link to="/consulting_review"><li class="header-categorie">상담후기</li></Link>
                <Link to="/help"><li class="header-categorie">고객센터</li></Link>
              </ul>
            </div>
          </div>
        </div>
        <div class="top-center">
          <div class="search-icon">
            <a class="icon-btn">
              <img class="icon" src="/images/search-icon.png" alt="검색 아이콘" width={20} height={20} href="search-btn"></img>
            </a>
          </div>
          <div class="search-area">
            <input type="text" placeholder='어떤 문제가 있으신가요?' maxLength="30" class="search-space"></input>
          </div>
        </div>
        <div class="top-right">
          <div class="login-sign-btn">
            {isLoggedIn ? (
              <Link onClick={logout}>로그아웃</Link>
            ) : (
              <Link to="/login_sign" target="_self">로그인/가입</Link>
              )}
          </div>
        </div>
      </div>
    </header>
		</>
    );
}

export default Header;