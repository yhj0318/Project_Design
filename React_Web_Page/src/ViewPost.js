/**
 * 2-5
 * 진행 사항:
 * 상세 페이지를 만들었다.
 * 게시글을 클릭하면 볼 수 있는 페이지이며, 수정 및 삭제버튼을 추가하였다.
 * 추후 로그인한 계정과 일치한다면 수정 및 삭제 권한을 주고 버튼을 활성화하는 코드를 추가 해야한다.
 * 아직은 위 기능이 구현되어있지 않아 누구나 수정 삭제가 가능하다.
 * 수정 기능은 아직 미완성으로 보여지는 것은 가능하지만 제목과 내용이 고정되어 수정이 불가능하여 이 문제를 해결 해야한다.
 * 삭제 기능은 정상적으로 동작한다.
 */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ViewPost = () => {
  const [post, setPost] = useState({title: '', content: ''});
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [checkboxes, setCheckboxes] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        console.log(res.data);
    })
      .catch(err => console.error(err));
    axios.get('http://localhost:8080/checkboxes')
      .then(response => setCheckboxes(response.data))
      .catch(error => console.error('Error fetching checkboxes:', error));
  }, [id]);

  const handleCheckboxChange = (itemId) => {
    setSelectedItem(itemId);
  };

  const handleUpdatePost = () => {
    setIsEditing(true);
  }
  
  const handleUpdatePostSave = async () => {
    await axios.put(`http://localhost:8080/api/update${id}`)
    .then((res) => {
        console.log('response is = ', res.data);
    })
    .catch((err) => {
        console.error('update error is = ', err);
    });
  }

  const handleDeletePost = async () => {
    await axios.delete(`http://localhost:8080/api/delete/${id}`)
    .then((res) => {
        console.log('response is =', res.data);
        navigate('/consulting_review');
    })
    .catch((err) => {
        console.error('delete error is = ', err);
    })
  }
  return (
    <div>
        {isEditing ? (
            <div>
                <h2>게시글 작성</h2>
                <p>제목</p>
                <input
                    type="text"
                    placeholder="제목을 입력해주세요"
                    value={post.Post_Title}
                    onChange={e => setPost({ ...post, title: e.target.value })}
                />
                <p>내용</p>
                <textarea
                    placeholder="1000자 이내로 작성해주세요"
                    value={post.Post_Content}
                    onChange={e => setPost({ ...post, content: e.target.value })}
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
            <button onClick={handleUpdatePostSave}>Update</button>
            </div>
        ) : (
            <div>
                <h2>작성번호</h2>
                <p>{post.Post_Num}</p>
                <h2>제목</h2>
                <p>{post.Post_Title}</p>
                <h2>내용</h2>
                <p>{post.Post_Content}</p>
                <h2>태그</h2>
                <p>{post.Post_Tag}</p>
                <h2>작성자</h2>
                <p>{post.Post_ID}</p>
                <h2>작성날짜</h2>
                <p>{post.Post_Date}</p>
                <button onClick={handleUpdatePost}>게시글 수정</button>
                <button onClick={handleDeletePost}>게시글 삭제</button>
            </div>
        )}
    </div>
  );
};

export default ViewPost;