/**
 * 4-1
 * 진행 사항:
 * 사용자로부터 메세지에 해당하는 값이 입력되면 해당 메세지에 맞는 함수를 실행하도록 한다. 해당 함수는 ActionProvider.jsx에 있다.
 */
import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.includes('안녕')) {
        actions.handleHello();
    }
    if (message.includes('홈페이지')) {
      actions.handleHomePage();
  }
    if (message.includes('상담')) {
        actions.Consulting();
    }
    if (message.includes('게시판')) {
        actions.Board();
    }
    if (message.includes('서비스')) {
      actions.handleService();
    }
    if (message.includes('로그인')) {
        actions.LoginSign();
  }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;