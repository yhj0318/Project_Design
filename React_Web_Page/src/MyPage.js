/**
 * 3-17
 * 진행 사항:
 * 마이페이지이다.
 * 이 페이지에서는 유저 데이터를 가져오고 그 데이터를 수정할 수 있는 페이지이다.
 * 아직 기능은 구현하지 않았지만 추후 수정하는 기능과 닉네임을 설정할 수 있는 페이지를 만드는 것이 목표이다.
 * 변호사일 경우 소속이나, 자기소개, 경력 등등 추가로 작성할 수 있는 칸이 더 늘어날 예정이다.
 * 
 * 3-19
 * 진행 사항:
 * 마이페이지 기능 중 프로필 사진을 업로드하기 위한 프로필 기능을 추가했다.
 * 
 */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './MyPage.css';

const MyPage = () => {
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();
    const [validation, setValidation] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
  
    useEffect(() => {
        fetchProfileImage();
        axios.get('http://localhost:8080/userdata')
        .then((response) => {
            setUserData(response.data);
            console.log(response.data)
        })
        .catch((error) => {
            console.error(error);
            alert('유저 데이터를 불러오는데 오류가 발생했습니다.');
            navigate('/');
        })
    },[])
    const fetchProfileImage = () => {
        axios.get('http://localhost:8080/profileImage')
          .then(response => {
            if (response.data && response.data !== '프로필 이미지가 없습니다.') {
              setProfileImage(response.data);
            }
          })
          .catch(error => {
            console.error('프로필 이미지를 가져오는 동안 오류가 발생했습니다:', error);
          });
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('profileImage', selectedFile);

        axios.post('http://localhost:8080/profileUpload', formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log('프로필 이미지 업로드 성공:', response.data);
            fetchProfileImage(); // 이미지 업로드 후 프로필 이미지 갱신
        }).catch(error => {
            console.error('프로필 이미지 업로드 도중 오류가 발생했습니다:', error);
        });
    };
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
                {<img src={'http://localhost:8080/profileImage'} alt="프로필 이미지" />}
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>업로드</button>
                </div>
            </div>
            <div class="mypage-bottom">

            </div>
        </div>
    );
};
  
export default MyPage;