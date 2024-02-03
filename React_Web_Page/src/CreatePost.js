/**
 * 2-1
 * 진행 사항:
 * 게시글 생성 페이지를 만들었다.
 * 아직 목업 상태이므로 추후 태그 선택이 가능하도록 수정하려한다.
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  useEffect(() => {
    axios.get('/api/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleCreatePost = () => {
    axios.post('/api/posts', newPost)
      .then(response => {
        setPosts([...posts, response.data]);
        setNewPost({ title: '', content: '' });
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <div>
        <h2>게시글 작성</h2>
        <p>태그</p>
        
        <p>제목</p>
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          value={newPost.title}
          onChange={e => setNewPost({ ...newPost, title: e.target.value })}
        />
        <p>내용</p>
        <textarea
          placeholder="1000자 이내로 작성해주시기 바랍니다"
          value={newPost.content}
          onChange={e => setNewPost({ ...newPost, content: e.target.value })}
        />
        <button onClick={handleCreatePost}>작성완료</button>
      </div>
    </div>
  );
};

export default CreatePost;
