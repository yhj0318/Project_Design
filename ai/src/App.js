import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatApp.css';  

function ChatApp() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/messages');
      setChatHistory(response.data.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (message.trim()) {
      try {
        await axios.post('http://localhost:3000/message', { message });
        setMessage('');
        fetchMessages();
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div>
      <h1>AI 상담 프로젝트 테스트</h1>
      <div className="chat-container">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`message ${msg.role === 'user' ? 'right' : 'left'}`}>
            <strong>{msg.role === 'user' ? 'You' : 'Assistant'}:</strong>
            {msg.content.map((item, itemIndex) => (
              <p key={itemIndex}>{item.text.value}</p>
            ))}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatApp;