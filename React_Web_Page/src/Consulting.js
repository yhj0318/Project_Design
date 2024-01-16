import React from 'react';

const Consulting = () => {
    const openNewWindow = () => {
        window.open('http://localhost:3000/', '_blank', 'width=600,height=700');
      };
    return (
        <div>
      
      <button onClick={openNewWindow}>채팅 상담 시작하기</button>
    </div>
    
    );
  };
  
export default Consulting;
