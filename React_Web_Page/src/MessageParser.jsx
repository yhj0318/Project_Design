/**
 * 4-1
 * 진행 사항:
 * 사용자로부터 메세지에 해당하는 값이 입력되면 해당 메세지에 맞는 함수를 실행하도록 한다. 해당 함수는 ActionProvider.jsx에 있다.
 */
import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.includes('hello')) {
        actions.handleHello();
    }
    if (message.includes('home')) {
      actions.handleHomePage();
  }
    if (message.includes('consulting')) {
        actions.consulting();
    }
    if (message.includes('board')) {
        actions.Board();
    }
    if (message.includes('loginSign')) {
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