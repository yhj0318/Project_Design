/**
 * 4-1
 * 진행 사항:
 * ActionProvider에서는 챗봇이 대답하는 방식을 정의한 파일이다.
 * 여기서는 MessageParser에서 호출되면 그 기능을 수행하는 함수가 존재한다.
 */
import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const handleHello = () => {
        const botMessage = createChatBotMessage('안녕하세요!');
    
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      };
      const handleDog = () => {
        const botMessage = createChatBotMessage(
          "여기 귀여운 강아지 사진입니다!",
          {
            widget: 'dogPicture',
          }
        );
    
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      };
      const handleHome = () => {
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
      const handleBoard = () => {
        const botMessage = createChatBotMessage(
          "게시판으로 안내하겠습니다!",
          {
            widget: 'board',
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
            handleHello,
            handleDog,
            handleHome,
            handleBoard,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;