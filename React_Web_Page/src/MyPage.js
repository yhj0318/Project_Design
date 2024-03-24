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
 * 3-20
 * 진행 사항:
 * 마이페이지 기능 중 유저 데이터를 받아 출력하는 작업을 진행
 * 또한 프로필 설정을 안한경우 기본 프로필로 보이도록 설정
 * 
 * 3-21
 * 진행 사항:
 * 마이페이지에서 수정하기 버튼과 저장하기 버튼 뒤로가기 버튼을 만들었다.
 * 아직 디자인은 손대지 않았기에 이 부분을 좀 더 해야할 것 같다.
 * 또한 예약페이지가 만들어지면 예약사항을 띄우도록 마이페이지에 표시하도록 만들 예정이다.
 * 
 * 3-24
 * 진행 사항:
 * 이미지를 svg로 했는데, 서버에서 해당 이미지 파일이 없다면 기본 이미지인 default.png로 되도록
 * 코드를 작성해서 imageValidation 상태를 삭제했다.
 * 사용자가 예약 내역을 확인할 수 있도록 페이지를 구성했다.
 * 예약테이블을 조회하고 값을 불러온다. 아직 진행에 해당하는 상담대기, 상담완료는 구현되지 않았다.
 * 예약이 없는 상태와 있는 상태 각각 구현했다.
 * CSS를 수정하여 좀 더 깔끔해 보이게 만들었다.
 */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './MyPage.css';

const MyPage = () => {
    const [userData, setUserData] = useState('');
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [userUpdateData, setUserUpdateData] = useState('');
    const [reserveList, setReserveList] = useState([]);
    const [reserveValidation, setReserveValidation] = useState(false);

    useEffect(() => {
        fetchProfileImage();
        axios.get('http://localhost:8080/userdata')
        .then((response) => {
            setUserData(response.data);
            setUserUpdateData(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
            alert('유저 데이터를 불러오는데 오류가 발생했습니다.');
            navigate('/');
        })
        axios.get('http://localhost:8080/reserveList')
        .then((response) => {
            console.log(response.data);
            setReserveList(response.data);
        })
        .catch((error) => {
            console.error('resrveList error is = ', error);
            setReserveValidation(true);
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
            alert('이미지 변경에 성공했습니다.');
            fetchProfileImage(); // 이미지 업로드 후 프로필 이미지 갱신
        }).catch(error => {
            console.error('프로필 이미지 업로드 도중 오류가 발생했습니다:', error);
            alert('업로드할 이미지를 선택해주세요');
        });
    };

    const handleUpdate = () => {
        setIsEditing(true);
    }

    const handleSave = async () => {
        await axios.put('http://localhost:8080/userDataUpdate',  {userUpdateData})
        .then((response) => {
            console.log(response.data);
            alert('저장되었습니다.');
            navigate('/');
        })
        .catch((error) => {
            console.error('userUpdate error is = ', error);
            alert('이메일, 전화번호, 주소를 빠짐없이 작성해주세요!');
        })
    }

    const handleBack = () => {
        setIsEditing(false);
    }
    return (
    <div>
        {isEditing ? (
        <div class="mypage-update">
            <div class="header-mypage">
                <div class="header-mypage-area">
                    <div class="header-mypage-text">
                        마이페이지 수정
                    </div>
                </div>
            </div>
            <div class="mypage-mid">
                <div class="mypage-left-side">
                    <div class="mypage-left-side-img-content">
                        <img class="mypage-img" src={'http://localhost:8080/profileImage'} alt="프로필 이미지" />
                        <div class="mypage-img-upload-btn">
                            <input type="file" onChange={handleFileChange} />
                            <button onClick={handleUpload}>업로드</button>
                        </div>
                    </div>
                    <div class="mypage-left-side-self-content">
                        <div class="mypage-left-side-self-area">
                            <div class="mypage-left-side-self-title">
                                자기소개란입니다.
                            </div>
                            <textarea class="mypage-left-side-self-text"
                            type="text"
                            placeholder="1000자 이내로 작성해주세요"
                            value={userUpdateData.aboutSelf}
                            onChange={e => setUserUpdateData({...userUpdateData, aboutSelf: e.target.value})}
                            />
                        </div>
                    </div>
                    <div class="mypage-left-side-update-btns">
                        <div class="mypage-left-side-save-btn" onClick={handleSave}>
                            저장하기
                        </div>
                        <div class="mypage-left-side-save-btn" onClick={handleBack}>
                            뒤로가기
                        </div>
                    </div>
                </div>
                <div class="mypage-right-side">
                    <div class="myPageData-main">
                        <div class="myPageData-content-wrap">
                            <span class="myPageData-title" id="userName">이름: </span>
                            <span class="myPageData-content">{userData.name}</span>
                        </div>
                        <div class="myPageData-content-wrap">
                            <span class="myPageData-title" id="userId">아이디: </span>
                            <span class="myPageData-content">{userData.id}</span>
                        </div>
                        <div class="myPageData-content-wrap">
                            <span class="myPageData-title" id="userEmail">이메일: </span>
                            <input 
                            class="myPageData-content"
                            type='text'
                            placeholder='이메일을 입력해주세요'
                            value={userUpdateData.email}
                            onChange={e => setUserUpdateData({...userUpdateData, email: e.target.value})}
                            />
                        </div>
                        <div class="myPageData-content-wrap">
                            <span class="myPageData-title" id="userPhoneNumber">핸드폰번호: </span>
                            <input 
                            class="myPageData-content"
                            type='text'
                            placeholder='핸드폰번호르 입력해주세요'
                            value={userUpdateData.phoneNumber}
                            onChange={e => setUserUpdateData({...userUpdateData, phoneNumber: e.target.value})}
                            />
                        </div>
                        <div class="myPageData-content-wrap">
                            <span class="myPageData-title" id="userAdress">주소: </span>
                            <input 
                            class="myPageData-content"
                            type='text'
                            placeholder='주소를 입력해주세요'
                            value={userUpdateData.adress}
                            onChange={e => setUserUpdateData({...userUpdateData, adress: e.target.value})}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ) : (
        <div class="mypage-main">
            <div class="header-mypage">
                <div class="header-mypage-area">
                    <div class="header-mypage-text">
                        마이페이지
                    </div>
                </div>
            </div>
            <div class="mypage-mid">
                <div class="mypage-left-side">
                    <div class="mypage-left-side-img-content">
                        <img class="mypage-img" src={'http://localhost:8080/profileImage'} alt="프로필 이미지" />
                    </div>
                    <div class="mypage-left-side-self-content">
                        <div class="mypage-left-side-self-area">
                            <div class="mypage-left-side-self-title">
                                자기소개란입니다.
                            </div>
                            <div class="mypage-left-side-self-text">
                                {userData.aboutSelf}
                            </div> 
                        </div>
                    </div>
                    <div class="mypage-left-side-update-btns">
                        <div class="mypage-left-side-update-btn" onClick={handleUpdate}>
                            정보 수정하기
                        </div>
                    </div>
                </div>
                <div class="mypage-right-side">
                    <div class="myPageData-main">
                        <div class="myPageData-content-wrap">
                            <span class="myPageData-title" id="userName">이름: </span>
                            <span class="myPageData-content">{userData.name}</span>
                        </div>
                        <div class="myPageData-content-wrap">
                            <span class="myPageData-title" id="userId">아이디: </span>
                            <span class="myPageData-content">{userData.id}</span>
                        </div>
                        <div class="myPageData-content-wrap">
                            <span class="myPageData-title" id="userEmail">이메일: </span>
                            <span class="myPageData-content">{userData.email}</span>
                        </div>
                        <div class="myPageData-content-wrap">
                            <span class="myPageData-title" id="userPhoneNumber">핸드폰번호: </span>
                            <span class="myPageData-content">{userData.phoneNumber}</span>
                        </div>
                        <div class="myPageData-content-wrap">
                            <span class="myPageData-title" id="userAdress">주소: </span>
                            <span class="myPageData-content">{userData.adress}</span>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="space"></hr>
            <div class="mypage-reserve-main">
                <p class="mypage-reserve-title">
                    예약현황
                </p>
                <div class="mypage-reserve-mid">
                <div class="mypage-reserve-subtitles">
                    <ul class="mypage-reserve-subtitle-wrap">
                        <li class="mypage-reserve-subtitle">구분</li>
                        <li class="mypage-reserve-subtitle">날짜</li>
                        <li class="mypage-reserve-subtitle">시간</li>
                        <li class="mypage-reserve-subtitle">변호사</li>
                        <li class="mypage-reserve-subtitle">진행</li>
                    </ul>
                </div>
                {reserveValidation ? (
                    <div class="mypage-reserve-contents">
                        <p>예약된 사항이 없습니다.</p>
                    </div>
                ) : (
                    <div class="mypage-reserve-contents">
                        {reserveList.map((list)=>(
                            <ul class="mypage-reserve-content-wrap" key={list.Reserve_Num}>
                                <li class="mypage-reserve-content">{list.Reserve_Consulting}</li>
                                <li class="mypage-reserve-content">{list.Reserve_Date}</li>
                                <li class="mypage-reserve-content">{list.Reserve_Time}</li>
                                <li class="mypage-reserve-content">{list.Reserve_Lawyer}</li>
                                <li class="mypage-reserve-content">상담대기</li>
                            </ul>
                        ))}
                    </div>
                )}
                </div>
            </div>
        </div>
        )}
    </div>
    );
};
  
export default MyPage;