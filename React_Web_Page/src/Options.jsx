/**
 * 4-4
 * 진행 사항:
 * 버튼에 대한 정의 파일이다.
 * 각 번호에 맞도록 정의를 해주고 name이름과 handler를 사용해서 actionProvider에 해당하는 함수를 호출한다.
 */
import React from "react";
import Options from "./Option";

const GeneralOptions = (props) => {
  const options = [
    {
      name: "홈페이지",
      handler: props.actionProvider.handleHomePage,
      id: 1,
    },
    {
      name: "서비스소개",
      handler: props.actionProvider.handleService,
      id: 2,
    },
    {
      name: "상담하기",
      handler: props.actionProvider.Consulting,
      id: 3,
    },
    {
      name: "로그인/가입",
      handler: props.actionProvider.LoginSign,
      id: 4,
    },
    {
      name: "상담게시판",
      handler: props.actionProvider.Board,
      id: 5,
    },
  ];

  return <Options options={options} />;
};

export default GeneralOptions;