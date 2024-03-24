/**
 * 3-10
 * 진행 사항:
 * 예약페이지를 만들 예정이다.
 * 만들기 이전에 변호사와 일반사용자를 구분지어놓기 위해 회원가입 부분을 먼저 수정하려고 한다.
 * 
 * 3-17
 * 진행 사항:
 * 회원가입에서 필요한 정보를 입력받아 유저 테이블에 저장한 값중 변호사인 경우에만 예약하기 페이지에 띄우도록 만들었다.
 * 추후 예약하기 페이지에 들어가면 날짜, 시간, 상담방법 등 여러가지 구현 목표가 있다.
 * 
 * 3-19
 * 진행 사항:
 * 회원가입시 이름을 입력받았기에 아이디 대신 이름으로 표현하는걸로 바꿨다.
 * 
 * 3-24
 * 진행 사항:
 * 페이지에 이미지 크기를 고정하기 위해 div태그로 묶고 css를 적용하여 width 160px로 고정
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import './Consulting.css';

const Consulting = () => {
  const [userData, setUserData] = useState([]);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/lawyerData')
    .then((response) => {
      console.log(response.data);
      setUserData(response.data);
    })
    .catch((error) => {
      console.error(error);
    })
  }, [])
    return (
      <div class="reserve-consulting-main">
        <div class="reserve-consulting-top">
          <div class="reserve-consulting-top-area">
            <div class="reserve-consulting-top-text">
              원하시는 변호사를 찾아보세요!
            </div>
          </div>
        </div>
        <div class="reserve-consulting-mid">
          {userData.map(user => (
            <ul class="reserve-lawyer-list" key={user.id}>
              <div class="reserve-lawyer-img-wrap">
                <img class="reserve-lawyer-img" src={`http://localhost:8080/lawyerProfile/${user.id}`}></img>
              </div>
              <li class="reserve-lawyer-lists" id="id">{user.name} 변호사님</li>
              <li class="reserve-lawyer-lists" id="email">{user.email}</li>
              <li class="reserve-lawyer-lists" id="phoneNumber">{user.phoneNumber}</li>
              <li class="reserve-lawyer-lists" id="adress">{user.adress}</li>
              <Link to={`/reserve/${user.id}`}>예약하기</Link>
            </ul>
          ))}
        </div>
        <div class="reserve-consulting-bottom">

        </div>
      </div>

    );
  };
  
export default Consulting;
