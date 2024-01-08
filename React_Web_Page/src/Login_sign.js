/**
 * 12-06
 * 진행 사항:
 * 로그인/가입 페이지를 만들었음
 * 아직 아이디랑 비밀번호를 DB에 연결하지 않아 실제 로그인은 미완성
 * 
 * 12-30
 * 진행 사항:
 * 로그인을 하기 위해 ajax로 통신한다. axios 라이브러리를 사용하였다.
 * 서버로부터 post요청을 하는 비동기 통신 방법을 채택했다.
 * 마찬가지로 서버로부터 수신을 받는 코드에 문제가 있는 것 같다. 수정 예정
 * 
 * 1-28
 * 진행 사항:
 * 로그인 버튼을 눌렀을 때 자동으로 새로고침이 되기에 그것을 막고자 event.preventDefault()를 추가
 * 이로인해 콘솔창이 자동으로 새로고침 되지 않아 콘솔 메세지를 확인할 수 있게 됌
 * 로그인이 되었는지 안 되었는지 확인을 위한 메세지 창을 띄움
 */
import React, { useState } from 'react';
import './Login_sign.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login_sign = () => {
    const [message, setMessage] = useState('');
    const [id, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login_sign', {
            id,
            password
        });
        setMessage(response.data);
        console.log(response.data);
        } catch (error) {
        console.error(error);
        }
    };
  
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
                    <input type='text' id="id" class="input-id" placeholder='아이디를 입력하세요' value={id} onChange={(e) => setUsername(e.target.value)}></input>
                    <label for="password">비밀번호</label>
                    <input type='password' id="password" class="input-pw" placeholder='비밀번호를 입력하세요' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <button class="login-btn" onClick={handleLogin}>로그인</button>
                </form>
                {message && (
                    <div>
                    <p>{message}</p>
                    </div>
                )}
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