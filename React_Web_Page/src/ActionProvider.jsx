/**
 * 4-1
 * 진행 사항:
 * ActionProvider에서는 챗봇이 대답하는 방식을 정의한 파일이다.
 * 여기서는 MessageParser에서 호출되면 그 기능을 수행하는 함수가 존재한다.
 * 
 * 4-4
 * 진행 사항:
 * 챗봇에 StartBtn을 달아두고 챗봇이 켜지면 바로갈 수 있는 버튼을 만들었다.
 */
import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
      const botMessage = createChatBotMessage('안녕하세요! 챗봇 도우미입니다!');
  
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    };
    const StartBtn = () => {
      const botMessage = createChatBotMessage(
        {
          widget: 'startBtn',
        }
      );
  
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    };
    const handleHomePage = () => {
      const botMessage = createChatBotMessage(
        "홈페이지로 안내하겠습니다!",
        {
          widget: 'homePage',
        }
      );
  
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    };
    const Consulting = () => {
      const botMessage = createChatBotMessage(
        "상담페이지로 안내하겠습니다!",
        {
          widget: 'consulting',
        }
      );
  
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    };
    const Board = () => {
      const botMessage = createChatBotMessage(
        "상담게시판으로 안내하겠습니다!",
        {
          widget: 'board',
        }
      );
  
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    };
    const LoginSign = () => {
      const botMessage = createChatBotMessage(
        "로그인페이지로 안내하겠습니다!",
        {
          widget: 'loginSign',
        }
      );
  
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    };
    const handleService = () => {
      const botMessage = createChatBotMessage(
        "로그인페이지로 안내하겠습니다!",
        {
          widget: 'service',
        }
      );
  
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    };
return (
  <div>
    {React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        actions: {
          StartBtn,
          handleHello,
          handleHomePage,
          Consulting,
          Board,
          LoginSign,
          handleService,
        },
      });
    })}
  </div>
);
};

export default ActionProvider;