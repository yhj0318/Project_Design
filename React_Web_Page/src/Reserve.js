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