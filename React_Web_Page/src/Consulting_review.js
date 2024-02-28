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
 * 
 * 2-5
 * 진행 사항:
 * 상세페이지로 들어가도록 해당 id에 맞는 게시글을 Link하여 보여주도록 만들었다.
 * 
 * 2-27
 * 진행 사항:
 * 검색 기능을 위해 검색하기 위한 인풋창을 새롭게 만들었다.
 * 또한 태그 검색을 위해 모두 Link로 걸어주고, 페이지 기능을 만들기위해 버튼과 axios를 ?(query)로 값을 보내줬다.
 * 10개의 게시글만 보이도록 설정했고, 아직까진 디자인을 생각하지 않아서 디자인을 수정하고,
 * 게시글이 10개 미만일 경우 버튼이 고정되지 않아 버튼을 고정시킬 방법을 생각해야한다.
 * 이 문제는 버튼 태그를 밖으로 빼는 방법이 적절할 것 같다. => 수정완료
 * 
 * 2-29
 * 진행 사항:
 * 버튼의 위치를 고정시켰고, 에러 헨들링을 하기위해 마지막 페이지임을 알려주고, 또한 게시글 생성을 위해 auth로 신원을
 * 파악하고, 로그인이 되어있지 않다면 로그인페이지로 이동하도록 만들었다.
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Consulting_review.css';
import {Link, useNavigate} from 'react-router-dom';
const Consulting_review = () => {
    const [posts, setPosts] = useState([]);
    const [searchLine, setSearchLine] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/posts?page=${currentPage}`)
        .then((response) => {
            setPosts(response.data)
        })
        .catch((error) => {
            console.error(error);
            alert('마지막 페이지입니다.')
        
        })}, [currentPage]);

    const handleAuthLogin = () => {
        axios.get('http://localhost:8080/auth')
        .then((response) => {
            console.log(response.data);
            navigate('/createPost');
        })
        .catch((error) => {
            console.error(error);
            alert('로그인이 필요합니다!');
            navigate('/login_sign');
        })
    }
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
                        <Link to={`/searchPost/${searchLine}`} class="review-top-content-search-icon">검색</Link>
                        <input type='text' placeholder='키워드를 입력하세요' value={searchLine} onChange={(e) => setSearchLine(e.target.value)} class="review-top-content-serach-area"></input>
                    </div>
                    <div onClick={handleAuthLogin} class="review-top-content-create">
                        게시글 작성
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
                                <Link to={`/viewPost/${post.Post_Num}`}>
                                    <ul class="review-mid-content-board-main-list" key={post.Post_Num}>
                                        <li class="review-mid-content-board-mains" id="num">{post.Post_Num}</li>
                                        <li class="review-mid-content-board-mains" id="user">{post.Post_ID}</li>
                                        <li class="review-mid-content-board-mains" id='title'>{post.Post_Title}</li>                                            <li class="review-mid-content-board-mains" id='date'>{post.Post_Date}</li>
                                        <li class="review-mid-content-board-mains" id='tag'>{post.Post_Tag}</li>
                                    </ul>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div class="review-mid-content-tag">
                        <div class="review-mid-content-tag-wrap">
                            <div class="review-mid-content-tags">
                                <Link to={'/searchPost/민사'} class="review-mid-content-list">
                                    <p>민사</p>
                                </Link>
                                <Link to={'/searchPost/상사'} class="review-mid-content-list">
                                    <p>상사</p>
                                </Link>
                                <Link to={'/searchPost/형사'} class="review-mid-content-list">
                                    <p>형사</p>
                                </Link>
                                <Link to={'/searchPost/노동'} class="review-mid-content-list">
                                    <p>노동</p>
                                </Link>
                                <Link to={'/searchPost/조세'} class="review-mid-content-list">
                                    <p>조세</p>
                                </Link>
                                <Link to={'/searchPost/지적재산권'} class="review-mid-content-list">
                                    <p>지적재산권</p>
                                </Link>
                                <Link to={'/searchPost/국제관계'} class="review-mid-content-list">
                                    <p>국제관계</p>
                                </Link>
                                <Link to={'/searchPost/행정'} class="review-mid-content-list">
                                    <p>행정</p>
                                </Link>
                                <Link to={'/searchPost/가사'} class="review-mid-content-list">
                                    <p>가사</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="review-page-buttons">
                <div onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))} class="review-page-button">이전 페이지</div>
                <div onClick={() => setCurrentPage(prevPage => prevPage + 1)} class="review-page-button">다음 페이지</div>
            </div>
        </div>
        </>
    );
};
  
export default Consulting_review;