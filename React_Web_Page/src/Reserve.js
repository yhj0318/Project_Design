/**
 * 3-21
 * 진행 사항:
 * 예약하기 페이지이다.
 * 이 페이지에서는 해당 변호사의 프로필과 어떤 상담을 할지, 시간, 날짜를 설정하여 예약을 진행할 수 있는 페이지이다.
 * 해당 페이지에 이미 상담이 잡혀있다면 회색으로 표현하도록 하기로 했다.
 */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

const Reserve = () => {
    const [lawyerData, setLawyerData] = useState([]);
    const { lawyerId } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/reserve/${lawyerId}`)
        .then((response) => {
            console.log(response.data);
            setLawyerData(response.data);
        })
        .catch((error) => {
            console.error(error);
        })
    }, [lawyerId])
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
                            <li class="reserve-page-lawyer-detail" id='id'>{lawyer.id} 변호사님</li>
                        </ul>
                    ))}
                </div>
            </div>
            <div class="reserve-page-bottom">

            </div>
        </div>
    );
};
export default Reserve;