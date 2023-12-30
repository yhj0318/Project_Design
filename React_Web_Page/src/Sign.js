/**
 * 12-06
 * 진행 사항:
 * 회원가입 페이지이다.
 * 아직까진 DB에 연결하지 않아서 제대로 된 기능을 하지 않는 페이지이다.
 * DB연결하여 간단하게 회원가입을 진행하도록 구현 예정이다.
 * 
 * 12-30
 * 진행 사항:
 * 회원가입 기능을 만들었다.
 * 로그인과 마찬가지로 axios 라이브러리를 사용하였다.
 * 비밀번호 확인은 나중에 기능을 추가할 예정이다.
 * 마찬가지로 서버로부터 수신을 받는 코드에 문제가 있는 것 같다. 수정 예정
 */
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Sign = () => {

    const [id, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
        const response = await axios.post('http://localhost:8080/sign', {
            id,
            password
        });
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
                <div class="login-top">회원가입</div>
                <form class="login-box">
                    <label for="id">아이디</label>
                    <input type='text' id="id" class="input-id" placeholder='아이디를 입력하세요' value={id} onChange={(e) => setUsername(e.target.value)}></input>
                    <label for="password">비밀번호</label>
                    <input type='password' id="password" class="input-pw" placeholder='비밀번호를 입력하세요' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    {/* <label for="password">비밀번호 확인</label>
                    <input type='password' id="password" class="input-pw" placeholder='비밀번호를 다시 입력하세요'></input> */}
                    <button class="login-btn" onClick={handleRegister}>회원가입</button>
                </form>
            </div>
        </div>
        </>
    );
};
  
export default Sign;