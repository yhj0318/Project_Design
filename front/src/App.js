import React, { useState, useEffect } from 'react';
import socket from "./server";
import InputField from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";
import "./App.css";




function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [userNotFoundMessage, setUserNotFoundMessage] = useState(null); // 새로운 상태 추가
  console.log("message List", messageList);

  

  useEffect(() => {
    socket.on("message", (message) => {
      setMessageList((prevState) => prevState.concat(message));
    });

    // 사용자를 찾을 수 없는 경우의 메시지 수신
    socket.on("userNotFound", (message) => {
      setUserNotFoundMessage(message);
    });
  }, []);

  // 로그인 함수
  const loginUser = (userID) => {
    try {
      if (userID) {
        socket.emit("login", userID, (response) => {
          if (response.ok) {
            setUser(response.data);
          } else {
            console.log(response.error);
          }
        });
      }
    } catch (error) {
      console.error('로그인 요청 에러:', error.message);
    }
  };

  // 컴포넌트가 마운트될 때 한번만 실행
  useEffect(() => {
    const userID = prompt("유저 ID를 입력하세요:");
    loginUser(userID);
  }, []);



  // 경고 메시지를 출력하는 함수
  const showUserNotFoundAlert = () => {
    window.alert(userNotFoundMessage);
    setUserNotFoundMessage(null); // 경고창이 닫힐 때 상태 초기화
    const newUserID = prompt("유저 ID를 다시 입력하세요:"); // 새로운 유저 ID 입력 받기
    loginUser(newUserID); // 다시 로그인 시도
  };
  
  // 컴포넌트가 렌더링될 때 경고창을 보여주기 위해 useEffect 내부에서 호출
  useEffect(() => {
    if (userNotFoundMessage) {
      showUserNotFoundAlert();
    }
  }, [userNotFoundMessage]);

  // 메시지 전송 함수
  const sendMessage = (event) => {
    event.preventDefault();
    // 수정: user.id를 사용하도록 변경
    socket.emit("sendMessage", user.id, message, (res) => {
      console.log("sendMessage res", res);
    });
    setMessage(''); // 메시지 전송 후 입력 필드 초기화
  };
  return (
    <div>
      <div className="App">
        <MessageContainer messageList={messageList} user={user} />
        <InputField
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
        {userNotFoundMessage && showUserNotFoundAlert()}
      </div>
    </div>
  );
}

export default App;