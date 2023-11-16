import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div class="wrapper">
      <div class="main">
        <header class="header">
          <div class="top">
            <div class="top-left">
              <div class="top-title">
                <h2 class="title">
                  <a href="index.html">프로젝트 제목</a>
                </h2>
              </div>
              <nav class="menu">
                <div class="menu-list">
                  <ul class="kategories">
                    <li class="kategorie"><a href="service.html">서비스 소개</a></li>
                    <li class="kategorie"><a href="imfo.html">법률 정보 공개</a></li>
                    <li class="kategorie"><a href="edit.html">개정법안</a></li>
                    <li class="kategorie"><a href="consulting.html">상담후기</a></li>
                    <li class="kategorie"><a href="help.html">고객센터</a></li>
                  </ul>
                </div>
              </nav>
            </div>
            <div class="top-center">
              <div class="search-icon">
                <a class="icon-btn">
                  <img class="icon" src="/images/search-icon.png" alt="검색 아이콘" width={20} height={20} href="search-btn"></img>
                </a>
              </div>
              <div class="search-area">
                <input type="text" placeholder='어떤 문제가 있으신가요?' maxLength="30" class="search-space"></input>
              </div>
            </div>
            <div class="top-right">
              <div class="login-btn">
                <a href="login-html" target="_self">로그인/가입</a>
              </div>
            </div>
          </div>
        </header>
        <div class="escape-line"></div>
        <section class="section">
          <div class="mid-content">
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
                  <div class="consulting-btn">채팅 상담
                    <img class="chat-img" src="chat-img"></img>
                  </div>
                  <div class="consulting-btn">영상 상담
                    <img class="video-img" src="video-img"></img>
                  </div>
                  <div class="consulting-btn">챗봇 상담
                    <img class="bot-img" src="bot-img"></img>
                  </div>
                  <div class="consulting-btn">AI 상담
                    <img class="ai-img" src="ai-img"></img>
                  </div>
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
        </section>
        <footer class="bottom"></footer>
      </div>
    </div>
  );
}

export default App;
