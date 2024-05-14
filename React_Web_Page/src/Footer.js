/**
 * 12-11
 * 진행 사항:
 * footer 페이지를 작성
 * 페이지로 이동하도록 만들었고, 소셜 미디어 공간에는 팀의 깃허브 주소를 넣었다.
 * 깃허브 아이콘은 부트스트랩에서 가져왔다.
 * 나중에 아이콘만 보여지는게 아니라 더 자세한 정보를 보여주도록 만들어도 좋을 것 같다.
 * 
 * 1-15
 * 진행 사항:
 * 풋터에 로그인이 됐을 경우 로그인/가입 클릭이 막히고 로그인 상태가 아니라면 로그인 페이지로 이동하도록 만들었다.
 */
import React from 'react';
import './Footer.css'
import { Link } from 'react-router-dom';

const Consulting = ({isLoggedIn}) => {
    return (
        <>
        <footer class="footer">
            <div class="footer-contain">
                <div class="footer-contain-content">
                    <Link to={'/'}>
                        <a class="footer-contain-content-main">
                            법률 상담 서비스
                        </a>
                    </Link>
                </div>
                <p class="footer-contain-group">
                    <Link to={'/service'}>
                        <a class="footer-contain-group-service">
                            서비스소개
                        </a>
                    </Link>
                    {/* <Link to={'/information'}>
                        <a class="footer-contain-group-service">
                            법률 정보 공개
                        </a>
                    </Link>
                    <Link to={'/edit_law'}>
                        <a class="footer-contain-group-service">
                            개정법안
                        </a>
                    </Link> */}
                    <Link to={'/consulting_review'}>
                        <a class="footer-contain-group-service">
                            상담후기
                        </a>
                    </Link>
                    <Link to={'/help'}>
                        <a class="footer-contain-group-service">
                            고객센터
                        </a>
                    </Link>
                    {isLoggedIn ? (
                        <Link target='_self' class="footer-contain-group-service">로그인/가입</Link>
                    ) : (
                        <Link to='/login_sign' class="footer-contain-group-service">로그인/가입</Link>
                    )}
                </p>
                <div class="footer-social-media">
                    <ul class="footer-social-media-group">
                        <li class="footer-social-media-icons">
                            <a href="https://github.com/yhj0318">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="footer-icons" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                                </svg>
                            </a>
                        </li>
                        <li class="footer-social-media-icons">
                            <a href="https://github.com/ChiDonggeun">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="footer-icons" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                                </svg>
                            </a>
                        </li>
                        <li class="footer-social-media-icons">
                            <a href="https://github.com/kcv8852">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="footer-icons" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
        </>
    );
};
  
export default Consulting;