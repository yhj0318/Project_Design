/**
 * 12-06
 * 진행 사항:
 * 로그인 버튼에 Link태그를 달고 페이지 이동을 시킴
 */
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import './Default.css';

function Header(props) {
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
            <Link to="/login_sign" target="_self">로그인/가입</Link>
          </div>
        </div>
      </div>
    </header>
		</>
    );
}

export default Header;