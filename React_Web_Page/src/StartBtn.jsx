/**
 * 각 함수를 만들고 이 함수는 ActionProvider에서 실행된다
 * 4-4
 * 진행 사항:
 * 버튼값을 Options에 넣어두고 이 값을 props로 불러들인다.
 */
import React from 'react';
import Options from "./Options";

export default function StartBtn(props) {
    return (
        <div>
            <Options actionProvider={props.actionProvider}/>
        </div>
    )
}