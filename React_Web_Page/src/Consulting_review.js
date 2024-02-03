/**
 * 2-1
 * 진행 사항:
 * 게시판 작업 CRUD 중 R을 진행하였다.
 * useEffect로 페이지에 접속할 때마다 작동하도록 하였고, get요청으로 데이터베이스에 있는 값을 불러온다.
 * 테스트 단계로 미흡한 부분이 있어 계속해서 수정이 필요하다.
 * 
 * 2-3
 * 진행 사항:
 * CRUD 중 C를 진행하였다.
 * 이제 수정 기능을 추가 해야한다.
 * 게시글을 눌러서 볼 수 있도록 페이지를 만들어야하고 만든 페이지에서 회원 정보와 일치한다면
 * 수정 권한을 통해 수정 버튼을 활성화 하고 게시글 수정 페이지로 넘어갈 수 있도록 만들어야 할 것 같다.
 * 이러한 작업 이전에 게시판에서 글을 선택할 수 있도록 만들어야 하고 그 후에 뷰페이지를 만들어야 한다.
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Consulting_review.css';
import {Link} from 'react-router-dom';

const NotFound = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:8080/api/posts')
        .then(response => setPosts(response.data))
        .catch(error => console.error(error));
    }, []);

    return (
        <>
        <div class="consulting-review">
            <div class="header-review">
                <div class="header-review-area">
                    <div class="header-review-text">
                        상담 게시판
                    </div>
                </div>
            </div>
            <div class="review-top-content">
                <div class="review-top-content-area">
                    <div class="review-top-content-search">
                        <div class="review-top-content-search-icon">검색</div>
                        <div class="review-top-content-serach-area">검색탭입니다.</div>
                    </div>
                    <div class="review-top-content-create">
                        <Link to={'/createPost'}>게시글 작성</Link>
                    </div>
                </div>
            </div>
            <div class="review-mid-content">
                <div class="review-mid-content-area">
                    <div class="review-mid-content-board">
                        <div class="review-mid-content-board-header">
                            <ul class="review-mid-content-board-header-list">
                                <li class="review-mid-content-board-headers" id="num">번호</li>
                                <li class="review-mid-content-board-headers" id="user">작성자</li>
                                <li class="review-mid-content-board-headers" id='title'>제목</li>
                                <li class="review-mid-content-board-headers" id='date'>작성날짜</li>
                                <li class="review-mid-content-board-headers" id='tag'>태그</li>
                            </ul>
                        </div>
                        <div class="review-mid-content-board-main">
                            {posts.map(post => (
                                <ul class="review-mid-content-board-main-list" key={post.Post_Num}>
                                    <li class="review-mid-content-board-mains" id="num">{post.Post_Num}</li>
                                    <li class="review-mid-content-board-mains" id="user">{post.Post_ID}</li>
                                    <li class="review-mid-content-board-mains" id='title'>{post.Post_Title}</li>
                                    <li class="review-mid-content-board-mains" id='date'>{post.Post_Date}</li>
                                    <li class="review-mid-content-board-mains" id='tag'>{post.Post_Tag}</li>
                                </ul>
                            ))}
                        </div>
                    </div>
                    <div class="review-mid-content-tag">
                        <div class="review-mid-content-tag-wrap">
                            <div class="review-mid-content-tags">
                                <div class="review-mid-content-list">
                                    <p>민사</p>
                                </div>
                                <div class="review-mid-content-list">
                                    <p>상사</p>
                                </div>
                                <div class="review-mid-content-list">
                                    <p>형사</p>
                                </div>
                                <div class="review-mid-content-list">
                                    <p>노동</p>
                                </div>
                                <div class="review-mid-content-list">
                                    <p>조세</p>
                                </div>
                                <div class="review-mid-content-list">
                                    <p>지적재산권</p>
                                </div>
                                <div class="review-mid-content-list">
                                    <p>국제관계</p>
                                    </div>
                                <div class="review-mid-content-list">
                                    <p>행정</p>
                                </div>
                                <div class="review-mid-content-list">
                                    <p>가사</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};
  
export default NotFound;