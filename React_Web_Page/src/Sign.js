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
 * 
 * 1-9
 * 진행 사항:
 * 로그인 기능과 마찬가지로 메세지 창을 띄움
 * 
 * 3-10
 * 진행 사항:
 * 예약하기 페이지를 만들기 위해 변호사와 일반사용자를 나누어야 한다.
 * 변호사를 클릭하면 입력창이 더 나와서 사무실 주소나 이메일 같은 부분을 작성하도록 한다.
 * 또한 약식으로 아이디랑 비밀번호만 작성하게했는데, 이 부분 또한 비밀번호 확인, 성별, 이메일, 핸드폰번호, 주소
 * 다양하게 세분화하여 나눠야한다. 이를 위해 데이터베이스도 수정이 필요하다.
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import './Sign.css'
const Sign = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [id, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [comparePassword, setComparePassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [adress, setAdress] = useState('');
    const [userCheckbox, setUserCheckbox] = useState([]);
    const [userSelect, setUserSelect] = useState(null);

    const handleRegister = async (event) => {
        event.preventDefault();
        if(password != comparePassword){
            setMessage('비밀번호가 일치하지 않습니다.');
            return;
        }
        try {
        const response = await axios.post('http://localhost:8080/sign', {
            id,
            password,
            email,
            adress,
            phoneNumber,
            userSelect
        });
        setMessage(response.data);
        console.log(response.data);
        alert('회원가입을 성공했습니다!');
        navigate('/');
        } catch (error) {
        console.error(error);
        }
    };

    useEffect(() => {
        axios.get('http://localhost:8080/userCheckboxes')
        .then(response => setUserCheckbox(response.data))
        .catch(error => console.error('Error fetching checkboxes:', error));
    }, []);

    const handleUserCheckboxChange = (itemId) => {
        setUserSelect(itemId);
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
                    <div class="userCheckbox-wrap">
                        {userCheckbox.map((userCheck) => (
                            <label class="userCheckbox" key={userCheck.id}>
                                <input 
                                type="checkbox" 
                                checked={userSelect === userCheck.id} 
                                onChange={() => handleUserCheckboxChange(userCheck.id)}
                                />
                                {userCheck.label}
                            </label>
                        ))}
                    </div>
                    <label class="login-box-label" for="id">아이디</label>
                    <input type='text' id="id" class="input-id" placeholder='아이디를 입력하세요' value={id} onChange={(e) => setUsername(e.target.value)}></input>
                    <label class="login-box-label" for="password">비밀번호</label>
                    <input type='password' id="password" class="input-pw" placeholder='비밀번호를 입력하세요' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <label class="login-box-label" for="password">비밀번호 확인</label>
                    <input type='password' id="password" class="input-pw" placeholder='비밀번호 다시 입력하세요' value={comparePassword} onChange={(e) => setComparePassword(e.target.value)}></input>
                    {message && (
                        <div>
                            <p>{message}</p>
                        </div>
                    )}
                    <label class="login-box-label" for="email">이메일</label>
                    <input type='text' id="email" class="input-id" placeholder='이메일을 입력하세요' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <label class="login-box-label" for="phoneNumber">전화번호</label>
                    <input type='text' id="phoneNumber" class="input-id" placeholder='전화번호를 입력하세요' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}></input>
                    <label class="login-box-label" for="adress">주소</label>
                    <input type='text' id="adress" class="input-id" placeholder='주소를 입력하세요' value={adress} onChange={(e) => setAdress(e.target.value)}></input>
                    <button class="login-btn" onClick={handleRegister}>회원가입</button>
                </form>
            </div>
        </div>
        </>
    );
};
  
export default Sign;