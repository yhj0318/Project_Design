/**
 * 2-1
 * 진행 사항:
 * 게시글 생성 페이지를 만들었다.
 * 아직 목업 상태이므로 추후 태그 선택이 가능하도록 수정하려한다.
 * 
 * 2-3
 * 진행 사항:
 * 게시글 작성하는 기능을 완성했다.
 * 체크박스를 가져오기 위해 get 요청으로 서버에 미리 만들어둔 리스트를 가져다가 보여준다.
 * 제목과 내용을 입력받아 서버로 전송해준다.
 * 프로토타입이라 디자인을 신경쓰지 못해 CSS 작업이 필요하다.
 * 작성 기능이 완료 됐으니 수정 기능을 추가해야한다.
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState({ title: '', content: ''});
  const [checkboxes, setCheckboxes] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/checkboxes')
      .then(response => setCheckboxes(response.data))
      .catch(error => console.error('Error fetching checkboxes:', error));
  }, []);

  const handleCheckboxChange = (itemId) => {
    setSelectedItem(itemId);
  };

  const handleCreatePost = async () => {
  await axios.post('http://localhost:8080/api/create', {newPost, selectedItem})
    .then(res => {
      console.log('res data is = ', res.data);
      navigate('/consulting_review');
    })
    .catch(error => console.error(error));
  };

  return (
  <div>
    <div>
      <h2>게시글 작성</h2>
      <p>제목</p>
      <input
        type="text"
        placeholder="제목을 입력해주세요"
        value={newPost.title}
        onChange={e => setNewPost({ ...newPost, title: e.target.value })}
      />
      <p>내용</p>
      <textarea
        placeholder="1000자 이내로 작성해주세요"
        value={newPost.content}
        onChange={e => setNewPost({ ...newPost, content: e.target.value })}
      />
      <p>태그</p>
        {checkboxes.map((checkbox) => (
          <label key={checkbox.id}>
            <input
              type="checkbox"
              checked={selectedItem === checkbox.id}
              onChange={() => handleCheckboxChange(checkbox.id)}
            />
            {checkbox.label}
          </label>
        ))}
      <button onClick={handleCreatePost}>Create</button>
    </div>
  </div>
  );
};

export default CreatePost;