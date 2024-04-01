/**
 * 4-1
 * 진행 사항:
 * config에서는 메세지에 해당하는 jsx파일을 보여주도록 작성되었다.
 */
import { createChatBotMessage } from 'react-chatbot-kit';
import DogPicture from '../src/DogPicture'
import HomePage from '../src/HomePage'
import Board from '../src/Board'
import 'react-chatbot-kit/build/main.css'
import './Chatbot.css';

const config = {
  initialMessages: [createChatBotMessage('안녕하세요! 페이지 도우미 챗봇입니다!')],
  widgets: [
    {
      widgetName: 'dogPicture',
      widgetFunc: (props) => <DogPicture {...props} />,
    },
    {
      widgetName: 'homePage',
      widgetFunc: (props) => <HomePage {...props} />,
    },
    {
      widgetName: 'board',
      widgetFunc: (props) => <Board {...props} />,
    },
  ],
};
export default config;