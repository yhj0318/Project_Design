/**
 * 12-11
 * 진행 사항:
 * Service 페이지를 작성
 * 전체적인 틀은 완성했고 추가로 글을 줄이거나 추가하는 작업은 나중에 진행
 */
import React from 'react';
import './Service.css'

const Service = () => {
    return (
    <>
    <div class="service-content">
        <div class="header-service">
            <div class="header-service-area">
                <div class="header-service-text">서비스 소개</div>
            </div>
        </div>
        <div class="service-screen">
            <div class="service-top">서비스 <a class="strong-text">배경</a></div>
            <div class="service-background">
                <div class="service-background-text-wrap">
                    <p class="service-background-text">
                        로스쿨 제도로 인해 변호사 수가 30,000명에 육박하지만 정작 변호사 한 사람당 월별로 1.2건의 수임 건수로 해마다 줄어들고 있습니다. 또한 변호를 필요로하는 분들이 점차 늘어나면서 공급 대비 수요가 맞지 않고있습니다. 그리고 각 변호사마다 분야가 다르기에 어떠한 변호사분에게 상담을 받아야하는지 모르는 경우가 많고 주변에 아는 변호사가 있는지에 대한 설문중 63.5%가 없다고 답했습니다. 그리고 73.56%의 변호사가 수도권에 집중되어 있는 것도 문제로 삼았습니다.
                    </p>
                </div>
            </div>
            <div class="service-mid">서비스 <a class="strong-text">목표</a></div>
            <div class="service-objective">
                <div class="service-objective-text-wrap">
                    <p class="service-objective-text">
                        따라서 저희 법률 상담 서비스 플랫폼에서는 여러 변호사분들의 정보를 쉽게 알 수 있는 플랫폼을 만들겠습니다. 수도권에 집중되어있는 변호사 수에 맞춰 직접 갈 수 없는 상황을 대비해 채팅상담과 영상상담, 챗봇상담, AI상담을 통해 사용자가 보다 쉽게 원하는 정보를 얻을 수 있도록 만들 것입니다.
                    </p>
                </div>
            </div>
        </div>
    </div>
    </>
    );
};
  
export default Service;