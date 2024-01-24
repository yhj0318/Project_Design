/**
 * 11-23 
 * 진행 사항:
 * mid-content를 만드는중
 * 
 * 해야 할 일:
 * review-content 만들어야함
 * 
 * 11-26
 * 진행 사항:
 * 아이콘을 부트스트랩 아이콘으로 삽입했음
 * 
 * 12-03
 * 진행 사항:
 * 미디어 쿼리를 사용하기 위해 따로 두었던 컨설팅 버튼과 컨설팅 설명을 같은 div태그에 묶었다.
 * 
 * 12-06
 * 진행 사항:
 * banner 이미지를 삽입했지만 이미지가 채워지는 바람에 텍스트가 밖으로 나가게 되어 텍스트는 주석처리 하여 보류하였음
 * 이미지를 뒤로 보내는 작업이 필요하다.
 * 이미지는 서버로 작업할 예정이라 pocess.env.PUBLIC_URL을 사용하였음
 * 
 * 1-24
 * 진행 사항:
 * 메인페이지에 상담게시판을 보여주기 위한 캐러셀을 만들어야했다.
 * 라이브러리를 사용하기로 하여 react-slick을 설치
 * 테스트로 작업을 해놓았고, 수정하여 게시판에 있는 내용이 보이도록 만들 것이다.
 * 자동 슬라이드 하도록 만들었고, 일부 효과를 수정하였다.
 */
import logo from './logo.svg';
import './Main_content.css';
import './Default.css';
import './Mid_content.css'
import {React, Component} from 'react';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './Reviews_content.css';

export default class Main extends Component {
  render(){
    const settings = {
      slide: 'div',		//슬라이드 되어야 할 태그 ex) div, li 
      infinite : true, 	//무한 반복 옵션	 
      slidesToShow : 3,		// 한 화면에 보여질 컨텐츠 개수
      slidesToScroll : 1,		//스크롤 한번에 움직일 컨텐츠 개수
      speed : 2500,	 // 다음 버튼 누르고 다음 화면 뜨는데까지 걸리는 시간(ms)
      autoplay : true,			// 자동 스크롤 사용 여부
      autoplaySpeed : 1000, 		// 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
      cssEase: "linear", // 슬라이드 이동 방식
      pauseOnHover : true,		// 슬라이드 이동	시 마우스 호버하면 슬라이더 멈추게 설정
      dotsClass : "slick-dots", 	//아래 나오는 페이지네이션(점) css class 지정
      draggable : true, 	//드래그 가능 여부
      centerMode: true,   // 가운데 정렬 사용 여부
      centerPadding: '50',  // 가운데 정렬 간격 조정
      pauseOnHover: true,   // 마우스 호버 되면 정지
    };
  return (
      <div class="main">
        <div class="escape-line"></div>
        <section class="section">
          <div class="main-content">
            <Link to={'/consulting'}>
              <div class="banner">
                <div class="banner-image">
                  <img class="banner-in-image" src={process.env.PUBLIC_URL + '/images/banner_img.png'}></img>
                </div>
                {/* <div class="banner-comment">
                  <div class="escape"></div>
                  <p class="banner-in-comment">AI를 통해 보다 빠르게 변호사와 상담하고 도움을 받으세요!</p>
                  <p class="banner-in-comment">필요한 정보를 입력하면 관련 판례와 법률들을 손쉽게 찾아볼 수 있습니다!</p>
                </div> */}
              </div>
            </Link>
            <div class="consulting">
                <div class="consulting-list">
                  <div class="consulting-wrap">
                    <div class="consulting-btn-icons" >
                      <Link to={'/consulting'} class="cbtn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="consulting-icons" viewBox="0 0 16 16">
                          <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                          <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"/>
                        </svg>
                        <p class="consulting-btn-icons-text">채팅상담</p>
                      </Link>
                    </div>
                    <div class="consulting-text">
                      채팅상담에 대한 내용입니다.
                    </div>
                  </div>
                  <div class="consulting-wrap">
                    <div class="consulting-btn-icons">
                      <Link to={'/consulting'} class="cbtn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="consulting-icons" viewBox="0 0 16 16">
                          <path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-6 5.7c0 .8.8.8.8.8h6.4s.8 0 .8-.8-.8-3.2-4-3.2-4 2.4-4 3.2Z"/>
                          <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5.243c.122-.326.295-.668.526-1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7.81c.353.23.656.496.91.783.059-.187.09-.386.09-.593V4a2 2 0 0 0-2-2H2Z"/>
                        </svg>
                        <p class="consulting-btn-icons-text">영상상담</p>
                      </Link>
                    </div>
                    <div class="consulting-text">
                      영상상담에 대한 내용입니다.
                    </div>
                  </div>
                  <div class="consulting-wrap">
                    <div class="consulting-btn-icons">
                      <Link to={'/consulting'} class="cbtn">
                        <svg xmlns="http://www.w3.org/2000/svg"fill="currentColor" class="consulting-icons" viewBox="0 0 16 16">
                          <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z"/>
                          <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z"/>
                        </svg>
                        <p class="consulting-btn-icons-text">챗봇상담</p>
                      </Link>
                    </div>
                    <div class="consulting-text">
                      챗봇상담에 대한 내용입니다.
                    </div>
                  </div>
                  <div class="consulting-wrap">
                    <div class="consulting-btn-icons">
                      <Link to={'/consulting'} class="cbtn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="consulting-icons" viewBox="0 0 16 16">
                          <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                          <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                        <p class="consulting-btn-icons-text">AI상담</p>
                      </Link>
                    </div>
                    <div class="consulting-text">
                      AI상담에 대한 내용입니다.
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <div class="mid-content">
            <div class="search-lawer">
              <div class="search-text">
                <p>어떤 문제가 있나요?</p>
              </div>
              <div class="search-category">
                <div class="mid-categorys">
                  <div class="mid-category-icon-wrap">
                    <div class="mid-category-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"  class="mid-icons" viewBox="0 0 16 16">
                      <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
                    </svg>
                    </div>
                  </div>
                  <div class="category-text">
                    <p>민사</p>
                  </div>
                </div>
                <div class="mid-categorys">
                  <div class="mid-category-icon-wrap">
                    <div class="mid-category-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="mid-icons" viewBox="0 0 16 16">
                      <path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022ZM6 8.694 1 10.36V15h5V8.694ZM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15Z"/>
                      <path d="M2 11h1v1H2v-1Zm2 0h1v1H4v-1Zm-2 2h1v1H2v-1Zm2 0h1v1H4v-1Zm4-4h1v1H8V9Zm2 0h1v1h-1V9Zm-2 2h1v1H8v-1Zm2 0h1v1h-1v-1Zm2-2h1v1h-1V9Zm0 2h1v1h-1v-1ZM8 7h1v1H8V7Zm2 0h1v1h-1V7Zm2 0h1v1h-1V7ZM8 5h1v1H8V5Zm2 0h1v1h-1V5Zm2 0h1v1h-1V5Zm0-2h1v1h-1V3Z"/>
                    </svg>
                    </div>
                  </div>
                  <div class="category-text">
                    <p>상사</p>
                  </div>
                </div>
                <div class="mid-categorys">
                  <div class="mid-category-icon-wrap">
                    <div class="mid-category-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="mid-icons" viewBox="0 0 16 16">
                      <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"/>
                      <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                    </svg>
                    </div>
                  </div>
                  <div class="category-text">
                    <p>형사</p>
                  </div>
                </div>
                <div class="mid-categorys">
                  <div class="mid-category-icon-wrap">
                    <div class="mid-category-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="mid-icons" viewBox="0 0 16 16">
                      <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                      <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                    </svg>
                    </div>
                  </div>
                  <div class="category-text">
                    <p>노동</p>
                  </div>
                </div>
                <div class="mid-categorys">
                  <div class="mid-category-icon-wrap">
                    <div class="mid-category-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="mid-icons" viewBox="0 0 16 16">
                      <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                      <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z"/>
                    </svg>
                    </div>
                  </div>
                  <div class="category-text">
                    <p>조세</p>
                  </div>
                </div>
                <div class="mid-categorys">
                  <div class="mid-category-icon-wrap">
                    <div class="mid-category-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="mid-icons" viewBox="0 0 16 16">
                      <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512Z"/>
                    </svg>
                    </div>
                  </div>
                  <div class="category-text">
                    <p>지적재산권</p>
                  </div>
                </div>
                <div class="mid-categorys">
                  <div class="mid-category-icon-wrap">
                    <div class="mid-category-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="mid-icons" viewBox="0 0 16 16">
                      <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
                    </svg>
                    </div>
                  </div>
                  <div class="category-text">
                    <p>국제관계</p>
                  </div>
                </div>
                <div class="mid-categorys">
                  <div class="mid-category-icon-wrap">
                    <div class="mid-category-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="mid-icons" viewBox="0 0 16 16">
                      <path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.501.501 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89L8 0ZM3.777 3h8.447L8 1 3.777 3ZM2 6v7h1V6H2Zm2 0v7h2.5V6H4Zm3.5 0v7h1V6h-1Zm2 0v7H12V6H9.5ZM13 6v7h1V6h-1Zm2-1V4H1v1h14Zm-.39 9H1.39l-.25 1h13.72l-.25-1Z"/>
                    </svg>
                    </div>
                  </div>
                  <div class="category-text">
                    <p>행정</p>
                  </div>
                </div>
                <div class="mid-categorys">
                  <div class="mid-category-icon-wrap">
                    <div class="mid-category-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="mid-icons" viewBox="0 0 16 16">
                      <path d="M5.793 1a1 1 0 0 1 1.414 0l.647.646a.5.5 0 1 1-.708.708L6.5 1.707 2 6.207V12.5a.5.5 0 0 0 .5.5.5.5 0 0 1 0 1A1.5 1.5 0 0 1 1 12.5V7.207l-.146.147a.5.5 0 0 1-.708-.708L5.793 1Zm3 1a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708L8.793 2Zm.707.707L5 7.207V13.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V7.207l-4.5-4.5Z"/>
                    </svg>
                    </div>
                  </div>
                  <div class="category-text">
                    <p>가사</p>
                  </div>
                </div>
                <div class="mid-categorys">
                  <div class="mid-category-icon-wrap">
                    <div class="mid-category-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="mid-icons" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                    </div>
                  </div>
                  <div class="category-text">
                    <p>기타</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="review-content">
            <div class="review-content-title">
              <div class="review-text">
                <p>상담게시판을 확인해보세요!</p>
              </div>
            </div>
            <div class="reviews">
              <div class="reviews-wrap">
                <div class="reviews-slick">
                  <Slider {...settings}>
                    {/* 테스트입니다 */}
                    <div>
                      <h3>1</h3>
                    </div>
                    <div>
                      <h3>2</h3>
                    </div>
                    <div>
                      <h3>3</h3>
                    </div>
                    <div>
                      <h3>4</h3>
                    </div>
                    <div>
                      <h3>5</h3>
                    </div>
                    <div>
                      <h3>6</h3>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}