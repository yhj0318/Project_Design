/**
 * 4-4
 * 진행 사항:
 * options를 받고 map함수를 사용해서 해당 값을 불러들여 options에 값을 차례대로 불러들임.
 */
import React from "react";
import "./OptionModule.css";

const Options = ({ options }) => {
  const markup = options.map((option) => (
    <button key={option.id} className="option" onClick={option.handler}>
      {option.name}
    </button>
  ));

  return <div className="options">{markup}</div>;
};

export default Options;