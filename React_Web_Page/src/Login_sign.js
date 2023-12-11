/**
 * 12-06
 * 진행 사항:
 * 로그인/가입 페이지를 만들었음
 * 아직 아이디랑 비밀번호를 DB에 연결하지 않아 실제 로그인은 미완성
 */
import React from 'react';
import './Login_sign.css';
import { Link } from 'react-router-dom';

const Login_sign = () => {
    return (
        <>
        <div class="login-sign-content">
            <div class="header-login">
                <div class="header-login-area">
                    <div class="header-login-text">로그인 / 가입</div>
                </div>
            </div>
            <div class="login-screen">
                <div class="login-top">로그인</div>
                <form class="login-box">
                    <label for="id">아이디</label>
                    <input type='text' id="id" class="input-id" placeholder='아이디를 입력하세요'></input>
                    <label for="password">비밀번호</label>
                    <input type='password' id="password" class="input-pw" placeholder='비밀번호를 입력하세요'></input>
                    <button class="login-btn">로그인</button>
                </form>
                <div class="sign-box">
                    상담을 위해 회원가입을 진행하세요!
                    <Link to={'/sign'} class="sign-btn">회원가입</Link>
                </div>
            </div>
        </div>
        </>
    );
};
  
export default Login_sign;