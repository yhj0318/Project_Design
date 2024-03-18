/**
 * 2-1
 * 진행 사항:
 * 게시판 작업 CRUD 중 R을 진행하였다.
 * useEffect로 페이지에 접속할 때마다 작동하도록 하였고, get요청으로 데이터베이스에 있는 값을 불러온다.
 * 테스트 단계로 미흡한 부분이 있어 계속해서 수정이 필요하다.
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Consulting_review.css";

const NotFound = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <div class="consulting-review">
        <div class="header-review">
          <div class="header-review-area">
            <div class="header-review-text">상담 게시판</div>
          </div>
        </div>
        <div class="review-top-content">
          <div class="review-top-content-area">
            <div class="review-top-content-search">
              <div class="review-top-content-search-icon">검색</div>
              <div class="review-top-content-serach-area">검색탭입니다.</div>
            </div>
            <div class="review-top-content-create">게시글 작성</div>
          </div>
        </div>
        <div class="review-mid-content">
          <div class="review-mid-content-area">
            <div class="review-mid-content-board">
              <div class="review-mid-content-board-header">
                <ul class="review-mid-content-board-header-list">
                  <li class="review-mid-content-board-headers" id="num">
                    번호
                  </li>
                  <li class="review-mid-content-board-headers" id="id">
                    작성자
                  </li>
                  <li class="review-mid-content-board-headers" id="title">
                    제목
                  </li>
                  <li class="review-mid-content-board-headers" id="date">
                    작성날짜
                  </li>
                  <li class="review-mid-content-board-headers" id="tag">
                    태그
                  </li>
                </ul>
              </div>
              <div class="review-mid-content-board-main">
                {posts.map((post) => (
                  <ul class="review-mid-content-board-main-list" key={post.Post_Num}>
                    <li class="review-mid-content-board-mains" id="num">
                      {post.Post_Num}
                    </li>
                    <li class="review-mid-content-board-mains" id="id">
                      {post.Post_ID}
                    </li>
                    <li class="review-mid-content-board-mains" id="title">
                      {post.Post_Title}
                    </li>
                    <li class="review-mid-content-board-mains" id="date">
                      {post.Post_Date}
                    </li>
                    <li class="review-mid-content-board-mains" id="tag">
                      {post.Post_Tag}
                    </li>
                  </ul>
                ))}
              </div>
            </div>
            <div class="review-mid-content-tag">
              <div class="review-mid-content-tag-wrap">
                <div class="review-mid-content-tags">
                  <div class="review-mid-content-list">태그</div>
                  <div class="review-mid-content-list">태그</div>
                  <div class="review-mid-content-list">태그</div>
                  <div class="review-mid-content-list">태그</div>
                  <div class="review-mid-content-list">태그</div>
                  <div class="review-mid-content-list">태그</div>
                  <div class="review-mid-content-list">태그</div>
                  <div class="review-mid-content-list">태그</div>
                  <div class="review-mid-content-list">태그</div>
                  <div class="review-mid-content-list">태그</div>
                  <div class="review-mid-content-list">태그</div>
                  <div class="review-mid-content-list">태그</div>
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
