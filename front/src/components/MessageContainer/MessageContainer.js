import React from "react";
import "./MessageContainer.css";
import { Container } from "@mui/system";

const MessageContainer = ({ messageList, user }) => {
  return (
    <div>
      {messageList.map((message) => (
        <Container key={message._id} className="message-container">
          {message.user.name === "system" ? (
            <div className="system-message-container">
              <p className="system-message">{message.chat}</p>
            </div>
          ) : message.user.name === user.id ? (
            <div className="my-message-container">
              <div className="my-message">{message.chat}</div>
            </div>
          ) : (
            <div className="your-message-container">
              {/* 상대방의 프로필 이미지를 왼쪽에 표시 */}
              <img
                src="/profile.jpeg"
                className="profile-image"
                style={{ marginRight: "10px" }} // 프로필 이미지와 메시지 사이 간격 조정
              />
              <div className="your-message-details">
                {/* 상대방의 ID를 메시지 바로 위에 표시 */}
                <span className="user-id-small">{message.user.name}</span>
                <div className="your-message">{message.chat}</div>
              </div>
            </div>
          )}
        </Container>
      ))}
    </div>
  );
};

export default MessageContainer;