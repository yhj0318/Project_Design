/**
 * 2-27
 * 진행 사항:
 * 검색을 했을 때 검색된 페이지로 이동하도록 만든 js파일이다.
 * 검색어가 제목, 내용, 태그 중 한 가지만 일치해도 결과를 보여주는 페이지이다.
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Consulting_review.css';
import {Link, useParams} from 'react-router-dom';

const SearchPost = () => {
    const [searchResult, setSearchResult] = useState([]);
    const { searchTerm } = useParams();
    const [searchLine, setSearchLine] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/search/${searchTerm}?page=${currentPage}`)
        .then((response) => {
            setSearchResult(response.data);
            console.log('search response data is = ', response.data);
        })
        .catch(
            error => console.error(error)
        );
    }, [searchTerm, currentPage]);

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
                            {searchResult.map(post => (
                                <Link to={`/viewPost/${post.Post_Num}`}>
                                    <ul class="review-mid-content-board-main-list" key={post.Post_Num}>
                                        <li class="review-mid-content-board-mains" id="num">{post.Post_Num}</li>
                                        <li class="review-mid-content-board-mains" id="user">{post.Post_ID}</li>
                                        <li class="review-mid-content-board-mains" id='title'>{post.Post_Title}</li>
                                        <li class="review-mid-content-board-mains" id='date'>{post.Post_Date}</li>
                                        <li class="review-mid-content-board-mains" id='tag'>{post.Post_Tag}</li>
                                    </ul>
                                </Link>
                            ))}
                        </div>
                        <div class="review-mid-content-board-page">
                            <button onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))} class="review-mid-content-board-page-button">이전 페이지</button>
                            <button onClick={() => setCurrentPage(prevPage => prevPage + 1)} class="review-mid-content-board-page-button">다음 페이지</button>
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
        </div>
        </>
    );
};
  
export default SearchPost;