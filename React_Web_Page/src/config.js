/**
 * 4-1
 * 진행 사항:
 * config에서는 메세지에 해당하는 jsx파일을 보여주도록 작성되었다.
 * 
 * 4-4
 * 진행 사항:
 * 버튼을 사용해서 이동할 수 있도록 만들었다.
 * StartBtn을 처음에 보여주고 버튼에 따라 이동할 수 있도록 만들었다.
 */
import { createChatBotMessage } from 'react-chatbot-kit';
import StartBtn from './StartBtn'
import ChatHomePage from "./ChatHomePage";
import ChatBoard from "./ChatBoard";
import ChatLoginSign from "./ChatLoginSign";
import ChatConsulting from "./ChatConsulting";
import ChatService from "./ChatService";
import 'react-chatbot-kit/build/main.css'
import './Chatbot.css';

const config = {
  initialMessages: [
    createChatBotMessage(
      '안녕하세요 페이지도우미 챗봇입니다!'
    ),
    createChatBotMessage(
      '여기 메뉴중 원하시는 작업을 선택하세요!',
      {
        withAvatar: false,
        delay: 500,
        widget: "startBtn",
      }
    ),
  ],
  state: {
    gist: "",
    infoBox: "",
  },
  customComponents: {},
  widgets: [
    {
      widgetName: "startBtn",
      widgetFunc: (props) => <StartBtn {...props} />,
      mapStateToProps: ["gist"],
    },
    {
      widgetName: "homePage",
      widgetFunc: (props) => <ChatHomePage {...props} />,
      mapStateToProps: ["gist", "infoBox"],
    },
    {
      widgetName: "board",
      widgetFunc: (props) => <ChatBoard {...props} />,
      mapStateToProps: ["gist", "infoBox"],
    },
    {
      widgetName: "loginSign",
      widgetFunc: (props) => <ChatLoginSign {...props} />,
      mapStateToProps: ["gist", "infoBox"],
    },
    {
      widgetName: "consulting",
      widgetFunc: (props) => <ChatConsulting {...props} />,
      mapStateToProps: ["gist", "infoBox"],
    },
    {
      widgetName: "service",
      widgetFunc: (props) => <ChatService {...props} />,
      mapStateToProps: ["gist", "infoBox"],
    },
  ],
};

export default config;