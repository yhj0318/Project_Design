import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatApp.css';

function App() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [id, setId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userID = urlParams.get('userID');
    
    if (userID) {
      loginUser(userID);
    } else {
      alert('유저 ID가 필요합니다.');
      window.close();
    }

    // 메시지 가져오는 인터벌 설정
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 5000); // 5초마다 메시지 가져오기

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 해제
  }, []);

  const loginUser = async (userID) => {
    try {
      const response = await axios.post('http://localhost:4000/login', { id: userID });
      if (response.data.success) {
        setId(userID);
        setIsLoggedIn(true);
        fetchMessages();
      } else {
        alert('로그인 실패: ' + response.data.message);
        window.close();
      }
    } catch (error) {
      console.error('Error during login:', error);
      window.close();
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:4000/messages');
      setChatHistory(response.data.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (message.trim()) {
      try {
        await axios.post('http://localhost:4000/message', { message, id });
        setMessage('');
        fetchMessages(); // 메시지 전송 후 메시지 목록 업데이트
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div>
      <h1>법률 도우미</h1>
      {!isLoggedIn ? (
        <div className="login-container">
          <p>로그인 중...</p>
        </div>
      ) : (
        <>
          <div className="chat-container">
            {chatHistory.map((msg, index) => (
              <div key={index} className={`message ${msg.role === 'user' ? 'right' : 'left'}`}>
                <strong>{msg.role === 'user' ? '고객' : '법률도우미'}:</strong>
                {msg.content.map((item, itemIndex) => (
                  <p key={itemIndex}>{item.text.value}</p>
                ))}
              </div>
            ))}
          </div>
          <div className="input-container">
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && sendMessage()}
              placeholder="메시지를 입력하세요..."
            />
            <button onClick={sendMessage}><i className="arrow right"></i></button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;