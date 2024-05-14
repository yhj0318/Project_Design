/**
 * 3-21
 * 진행 사항:
 * 예약하기 페이지이다.
 * 이 페이지에서는 해당 변호사의 프로필과 어떤 상담을 할지, 시간, 날짜를 설정하여 예약을 진행할 수 있는 페이지이다.
 * 해당 페이지에 이미 상담이 잡혀있다면 회색으로 표현하도록 하기로 했다.
 * 
 * 3-24
 * 진행 사항:
 * 예약하기 페이지에서 날짜 시간을 입력받는게 까다로웠는데, 간단한 라이브러리를 찾아 사용했다.
 * react-datepicker 라이브러리를 설치했다.
 * 원래는 react-datepicker와 react-time-picker를 같이 사용하려 했는데 react-datepicker에 시간 기능도 있길래 하나만 사용했다.
 * 또한 한글, 시간을 사용하기 위해 date-fns 라이브러리도 같이 설치했다.
 * 예약 가능 시간은 09:00 ~ 17:00 으로 1시간 단위로 예약이 가능하다는 전제하에 시간을 설정했다.
 * 이외에 시간에는 예약이 불가능 하도록 minTime, maxTime을 설정했다.
 * handlerSubmit이 실행되면 원래는 ISO 8601 표준으로 날짜와 시간이 표현되는데, 이를 보기 쉽게 표현하고자 코드 몇줄을 추가했다.
 * isAvaliable 상태를 사용하진 못해서 해당 시간대에 예약 불가능 표시를 못했다.
 * 
 * 5-12
 * 진행 사항:
 * 예약이 완료된 날짜와 시간을 서버로부터 가져오고 그 값을 비교하여 비활성화 되도록 만들었다.
 * 또한 현재 시간을 기준으로 이미 지나간 시간에 대해서는 비활성화 되도록 만들었다.
 * 처음에는 그냥 비활성화에만 집중했는데 만들다보니 변호사별로 비활성화를 구분지었어야 해서
 * useEffect에서 CheckReserved에 lawyerId를 추가로 요청하여 해당 변호사의 아이디에 해당하는 예약 정보만 가져오도록 만들었다.
 */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { set, setHours, setMinutes } from 'date-fns';
import { ko } from "date-fns/locale";
import './Reserve.css';

const Reserve = () => {
    const [lawyerData, setLawyerData] = useState([]);
    const { lawyerId } = useParams();
    const [startDate, setStartDate] = useState(new Date());
    const [consultingCheckbox, setConsultingCheckbox] = useState([]);
    const [userSelect, setUserSelect] = useState(null);
    const [reservedTime, setReservedTime] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/reserve/${lawyerId}`)
        .then((response) => {
            console.log(response.data);
            setLawyerData(response.data);
        })
        .catch((error) => {
            console.error(error);
        })
        
        axios.get('http://localhost:8080/consultingCheckboxes')
        .then((response) => {
            console.log(response.data);
            setConsultingCheckbox(response.data);
        })
        .catch((error) => {
            console.error(error);
        })
        
        axios.get(`http://localhost:8080/checkReserved/${lawyerId}`)
        .then((response) => {
            console.log(response.data);
            setReservedTime(response.data);
        })
        .catch((error) => {
            console.error(error);
        })
    }, [lawyerId])

    const handleDateChange = (date) => {
        setStartDate(date);
    };

    const handleConsultingCheckboxChange = (itemId) => {
        setUserSelect(itemId);
      };

    const handleSubmit = () => {
        axios.get('http://localhost:8080/auth')
        .then((response) => {
            console.log(response.data);
            console.log('startDate is = ',startDate);
            const year = startDate.getFullYear();
            const month = startDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
            const day = startDate.getDate();
            const date = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
            console.log(date);
            const hours = startDate.getHours();
            const minutes = startDate.getMinutes();
            const time = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
            console.log(time);
            const dateTime = date + " " + time;
            reserveToServer(dateTime);
        })
        .catch((error) => {
            console.error(error);
            alert('예약에는 로그인이 필요합니다!');
            navigate('/login_sign');
        })
    };

    const reserveToServer = (dateTime) => {
        axios.post('http://localhost:8080/api/reserve', { 
            selectedDateTime: dateTime, 
            userSelect,
            lawyerId
        })
        .then(response => {
            console.log(response.data);
            alert('예약이 완료되었습니다!');
            navigate('/');
        })
        .catch(error => {
            console.error('Error sending data to server:', error);
            alert('잘못된 접근입니다.');
            navigate('/');
        });
    };
    const getReservedTimesForDate = date => {
        return reservedTime
          .filter(item => new Date(item).toDateString() === date.toDateString())
          .map(item => new Date(item));
      };

    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDateTime = startDate || new Date();
        // 선택한 날짜가 현재 날짜와 같고, 선택한 시간이 현재 시간보다 이후인지 확인
        const isFutureTime = selectedDateTime.toDateString() === currentDate.toDateString() && time > currentDate;
        // 선택한 날짜가 현재 날짜보다 미래이거나 선택한 시간이 현재 시간보다 이후인 경우에만 예약 가능
        if (selectedDateTime > currentDate || isFutureTime) {
            const reservedTimes = getReservedTimesForDate(selectedDateTime);
            return !reservedTimes.some(reservedTime => reservedTime.getHours() === time.getHours() && reservedTime.getMinutes() === time.getMinutes());
        }
        return false;
    }
    return (
        <div class="reserve-page-main">
            <div class="reserve-page-top">
                <div class="reserve-page-detail">
                    예약하기 페이지입니다.
                </div>
            </div>
            <div class="reserve-page-mid">
                <div class="reserve-page-mid-detail">
                    {lawyerData.map(lawyer => (
                        <ul class="reserve-page-lawyer" key={lawyer.id}>
                            <div class="reserve-page-lawyer-details">
                                <div class="reserve-page-lawyer-detail-title">성명: </div>
                                <li class="reserve-page-lawyer-detail-content" id='id'>{lawyer.id} 변호사님</li>
                            </div>
                            <div class="reserve-page-lawyer-details">
                                <div class="reserve-page-lawyer-detail-title">이메일: </div>
                                <li class="reserve-page-lawyer-detail-content" id='email'>{lawyer.email}</li>
                            </div>
                            <div class="reserve-page-lawyer-details">
                                <div class="reserve-page-lawyer-detail-title">주소: </div>
                                <li class="reserve-page-lawyer-detail-content" id='adress'>{lawyer.adress}</li>
                            </div>
                            <div class="reserve-page-lawyer-details">
                                <div class="reserve-page-lawyer-detail-title">전화번호: </div>
                                <li class="reserve-page-lawyer-detail-content" id='phoneNumber'>{lawyer.phoneNumber}</li>
                            </div>
                            <div class="reserve-page-lawyer-details">
                                <div class="reserve-page-lawyer-detail-title">자기소개: </div>
                                <li class="reserve-page-lawyer-detail-content" id='aboutSelf'>{lawyer.aboutSelf}</li>
                            </div>
                        </ul>
                    ))}
                </div>
            </div>
            <div class="reserve-page-bottom">
                <div class="reserve-page-bottom-content">
                    <div class="reserve-consultingbox">
                        <span class="reserve-consulting-title">상담구분:</span>
                        <span class="consultingCheckbox-wrap">
                            {consultingCheckbox.map((consultingCheck) => (
                                <label class="consultingCheckbox" key={consultingCheck.id}>
                                    <input 
                                    type="checkbox" 
                                    checked={userSelect === consultingCheck.id} 
                                    onChange={() => handleConsultingCheckboxChange(consultingCheck.id)}
                                    />
                                    {consultingCheck.label}
                                </label>
                            ))}
                        </span>
                    </div>
                    <div class="reserve-date-time">
                        <label>상담 날짜 및 시간:</label>
                        <DatePicker
                        id='input-data'
                        selected={startDate}
                        onChange={handleDateChange}
                        showTimeSelect
                        locale={ko}
                        excludeTimes={getReservedTimesForDate(startDate || new Date())}
                        filterTime={filterPassedTime}
                        minTime={setHours(setMinutes(new Date(), 0), 9)}
                        maxTime={setHours(setMinutes(new Date(), 0), 17)}
                        dateFormat="yyyy년 MM월 dd일 aa h시 mm분"
                        />
                    </div>
                </div>
                <button class="reserve-btn" type="submit" onClick={handleSubmit}>예약하기</button>
            </div>
        </div>
    );
};
export default Reserve;