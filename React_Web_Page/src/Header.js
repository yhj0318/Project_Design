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
 * 
 * 1-15
 * 진행 사항:
 * 쿠키에 대한 오류를 해결했다.
 * 오류의 원인은 CORS오류로 원래 정책상 쿠키를 전송하는게 불가능 했기에 그것을 풀어주기 위해
 * withCredentials를 true로 바꿔줘야했다.
 * 클라이언트에서도 true로 바꾸고 서버에서도 마찬가지로 true로 바꿔줘야한다.
 * axios통신을 하면서 쿠키를 수신하거나 송신받으려면 꼭 이 작업이 선행되어야 한다.
 * 따라서 이 구문을 추가했더니 원래의 로직대로 서버로부터 쿠키를 받고 스토리지에 저장이 가능했다.
 * 쿠키가 저장되어 서버로 전송하는 것도 가능하게 되어 로그인 상태를 유지하도록 만드는게 가능했다.
 * 가독성을 위해 try catch문을 promise로 바꿨다.
 */
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import './Default.css';
import axios from 'axios';

const Header = ({isLoggedIn, handleLogout}) => {
  const logout = async() => {
    const cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++){
      const cookie = cookies[i].trim();
      if(cookie.startsWith('x_auth' + '=')){
        console.log('x_auth cookie is = ', cookie);
        await axios.get('http://localhost:8080/logout', {withCredentials: true})
        .then((res) => {
          console.log(res.data);
          handleLogout();
        })
        .catch((err) => {
          console.log('logout error = ', err);
        })
      }
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