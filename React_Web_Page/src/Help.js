/**
 * 1-24
 * 진행 사항:
 * 고객센터에 들어갈 틀을 먼저 작성하였다
 * 공지사항과 자주하는질문 두 개로 나뉘었고, 나중에 글을 작성하고 올릴 수 있도록 기능을 추가하면 된다.
 */
import React from 'react';
import './Help.css';

const Help = () => {
    return (
        <>
        <div class="Help-content">
            <div class="header-help">
                <div class="header-help-area">
                    <div class="header-help-text">고객센터</div>
                </div>
            </div>
            <div class="help-screen">
                <div class="help-top">공지사항</div>
                <div class="help-notice">
                    <div class="help-notice-text-wrap">
                        <p class="help-notice-text">
                            공지사항을 작성하는 칸 입니다.
                        </p>
                    </div>
                </div>
                <div class="help-top">자주하는질문</div>
                <div class="help-qna">
                    <div class="help-qna-text-wrap">
                        <p class="help-qna-text">
                            자주하는질문을 작성하는 칸 입니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};
  
export default Help;