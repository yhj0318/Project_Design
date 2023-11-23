/**
 * 11-23 
 * 진행 사항:
 * mid-content를 만드는중
 * 
 * 해야 할 일:
 * review-content 만들어야함
 */
import logo from './logo.svg';
import './Main_content.css';
import './Default.css';
import './Mid_content.css'
import React from 'react';
import { Link } from 'react-router-dom';

const Main = (props) => {
  return (
      <div class="main">
        <div class="escape-line"></div>
        <section class="section">
          <div class="main-content">
            <div class="banner" href="conserting-html">
              <div class="banner-image">
                <img class="banner-in-image" src="banner-image.jpg"></img>
              </div>
              <div class="banner-comment">
                <div class="escape"></div>
                <p class="banner-in-comment">AI를 통해 보다 빠르게 변호사와 상담하고 도움을 받으세요!</p>
                <p class="banner-in-comment">필요한 정보를 입력하면 관련 판례와 법률들을 손쉽게 찾아볼 수 있습니다!</p>
              </div>
            </div>
            <div class="consulting">
              <div class="consulting-box">
                <div class="consulting-list">
                  <div class="consulting-btn" >
                    <a href="chat_consulting.html">채팅 상담</a>
                    <img class="chat-img" src="chat-img"></img>
                  </div>
                  <div class="consulting-btn">
                    <a href="video_consulting.html">영상 상담</a>
                    <img class="video-img" src="video-img"></img>
                  </div>
                  <div class="consulting-btn">
                    <a href="chat_bot_consulting.html">챗봇 상담</a>
                    <img class="bot-img" src="bot-img"></img>
                  </div>
                  <div class="consulting-btn">
                    <a href="ai_consulting.html">AI 상담</a>
                    <img class="ai-img" src="ai-img"></img>
                  </div>
                </div>
              </div>
              <div class="consulting-explain">
                <div class="text-box">
                  <div class="text">채팅 상담에 대한 설명입니다.</div>
                  <div class="text">영상 상담에 대한 설명입니다.</div>
                  <div class="text">챗봇 상담에 대한 설명입니다.</div>
                  <div class="text">AI 상담에 대한 설명입니다.</div>
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
                <button class="categorys">
                  <div class="category-icon-wrap">
                    <div class="category-icon">
                      <svg width={56} height={56} viewBox='0 0 56 56' fill='none'>
                        <path d=''></path>
                      </svg>
                    </div>
                  </div>
                  <div class="category-text">
                    <p>분류</p>
                  </div>
                </button>
                <button class="categorys">
                  <div class="category-icon-wrap">
                    <div class="category-icon">
                      <svg width={56} height={56} viewBox='0 0 56 56' fill='none'>
                        <path d=''></path>
                      </svg>
                    </div>
                  </div>
                  <div class="category-text">
                    <p>분류</p>
                  </div>
                </button>
                <button class="categorys">
                  <div class="category-icon-wrap">
                    <div class="category-icon">
                      <svg width={56} height={56} viewBox='0 0 56 56' fill='none'>
                        <path d=''></path>
                      </svg>
                    </div>
                  </div>
                  <div class="category-text">
                    <p>분류</p>
                  </div>
                </button>
                <button class="categorys">
                  <div class="category-icon-wrap">
                    <div class="category-icon">
                      <svg width={56} height={56} viewBox='0 0 56 56' fill='none'>
                        <path d=''></path>
                      </svg>
                    </div>
                  </div>
                  <div class="category-text">
                    <p>분류</p>
                  </div>
                </button>
                <button class="categorys">
                  <div class="category-icon-wrap">
                    <div class="category-icon">
                      <svg width={56} height={56} viewBox='0 0 56 56' fill='none'>
                        <path d=''></path>
                      </svg>
                    </div>
                  </div>
                  <div class="category-text">
                    <p>분류</p>
                  </div>
                </button>
                <button class="categorys">
                  <div class="category-icon-wrap">
                    <div class="category-icon">
                      <svg width={56} height={56} viewBox='0 0 56 56' fill='none'>
                        <path d=''></path>
                      </svg>
                    </div>
                  </div>
                  <div class="category-text">
                    <p>분류</p>
                  </div>
                </button>
                <button class="categorys">
                  <div class="category-icon-wrap">
                    <div class="category-icon">
                      <svg width={56} height={56} viewBox='0 0 56 56' fill='none'>
                        <path d=''></path>
                      </svg>
                    </div>
                  </div>
                  <div class="category-text">
                    <p>분류</p>
                  </div>
                </button>
                <button class="categorys">
                  <div class="category-icon-wrap">
                    <div class="category-icon">
                      <svg width={56} height={56} viewBox='0 0 56 56' fill='none'>
                        <path d=''></path>
                      </svg>
                    </div>
                  </div>
                  <div class="category-text">
                    <p>분류</p>
                  </div>
                </button>
                <button class="categorys">
                  <div class="category-icon-wrap">
                    <div class="category-icon">
                      <svg width={56} height={56} viewBox='0 0 56 56' fill='none'>
                        <path d=''></path>
                      </svg>
                    </div>
                  </div>
                  <div class="category-text">
                    <p>분류</p>
                  </div>
                </button>
                <button class="categorys">
                  <div class="category-icon-wrap">
                    <div class="category-icon">
                      <svg width={56} height={56} viewBox='0 0 56 56' fill='none'>
                        <path d=''></path>
                      </svg>
                    </div>
                  </div>
                  <div class="category-text">
                    <p>분류</p>
                  </div>
                </button>
                <button class="categorys">
                  <div class="category-icon-wrap">
                    <div class="category-icon">
                      <svg width={56} height={56} viewBox='0 0 56 56' fill='none'>
                        <path d=''></path>
                      </svg>
                    </div>
                  </div>
                  <div class="category-text">
                    <p>분류</p>
                  </div>
                </button>
                <button class="categorys">
                  <div class="category-icon-wrap">
                    <div class="category-icon">
                      <svg width={56} height={56} viewBox='0 0 56 56' fill='none'>
                        <path d=''></path>
                      </svg>
                    </div>
                  </div>
                  <div class="category-text">
                    <p>분류</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div class="review-content">
            <div class="review-content-title"></div>
            <div class="reviews"></div>
          </div>
        </section>
        <footer class="bottom"></footer>
      </div>
  );
}

export default Main;
