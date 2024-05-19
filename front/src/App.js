import React, { useState, useEffect } from 'react';
import socket from "./server";
import InputField from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessageList(prevState => [...prevState, message]);
    });

    socket.on("loginRequired", (message) => {
      alert(message); 
      window.close(); 
    });

    const urlParams = new URLSearchParams(window.location.search);
    const userID = urlParams.get('userID');

    if (userID) {
      loginUser(userID);
    } else {
      alert("유저 ID가 필요합니다.");
      window.close();
    }
  }, []);

  const loginUser = (userID) => {
    console.log("로그인 시도: ", { userID });

    if (userID) {
      socket.emit("login", userID, (response) => {
        if (response.ok) {
          setUser(response.data);
        } else {
          console.log("로그인 실패: ", response.error);
          alert(response.error); 
          window.close(); 
        }
      });
    } else {
      alert("로그인 정보가 부족합니다.");
      window.close();
    }
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (user && user.id && message.trim()) {
      socket.emit("sendMessage", user.id, message, (res) => {
        if (res.ok) {
          setMessage(''); 
        } else {
          console.log("Message send failed:", res.error);
        }
      });
    }
  };

  return (
    <div className="App">
      <MessageContainer messageList={messageList} user={user} />
      <InputField
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
}

export default App;