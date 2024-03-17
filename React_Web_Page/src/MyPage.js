/**
 * 3-17
 * 진행 사항:
 * 마이페이지이다.
 * 이 페이지에서는 유저 데이터를 가져오고 그 데이터를 수정할 수 있는 페이지이다.
 * 아직 기능은 구현하지 않았지만 추후 수정하는 기능과 닉네임을 설정할 수 있는 페이지를 만드는 것이 목표이다.
 * 변호사일 경우 소속이나, 자기소개, 경력 등등 추가로 작성할 수 있는 칸이 더 늘어날 예정이다.
 */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const MyPage = () => {
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/userdata')
        .then((response) => {
            setUserData(response.data);
        })
        .catch((error) => {
            console.error(error);
            alert('유저 데이터를 불러오는데 오류가 발생했습니다.');
        })
    },[])
    return (
        <div class="mypage-main">
            <div class="header-mypage">
                <div class="header-mypage-area">
                    <div class="header-mypage-text">
                        마이페이지
                    </div>
                </div>
            </div>
            <div class="mypage-mid">
                <div class="mypage-mid-">
                    
                </div>
            </div>
            <div class="mypage-bottom">

            </div>
        </div>
    );
};
  
export default MyPage;