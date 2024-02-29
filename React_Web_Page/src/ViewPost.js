/**
 * 2-5
 * 진행 사항:
 * 상세 페이지를 만들었다.
 * 게시글을 클릭하면 볼 수 있는 페이지이며, 수정 및 삭제버튼을 추가하였다.
 * 추후 로그인한 계정과 일치한다면 수정 및 삭제 권한을 주고 버튼을 활성화하는 코드를 추가 해야한다.
 * 아직은 위 기능이 구현되어있지 않아 누구나 수정 삭제가 가능하다.
 * 수정 기능은 아직 미완성으로 보여지는 것은 가능하지만 제목과 내용이 고정되어 수정이 불가능하여 이 문제를 해결 해야한다.
 * 삭제 기능은 정상적으로 동작한다.
 * 
 * 2-8
 * 진행 사항:
 * 내용이 고정되어 수정이 불가능한 문제를 해결했다. 조회하는 데이터셋과 변경하려는 데이터셋의 상태가 서로 같았기에 수정이 불가능했다.
 * 상태는 상수로서 절대불변이기에 바꾸려는 값을 다른 상태에 저장하여 문제를 해결했다.
 * 
 * 2-29
 * 진행 사항:
 * 디자인 적용을 위해 HTML 작업을 진행했고, 권한이 없는 사용자에게 수정 및 삭제가 불가능 하도록 만들었다.
 * 해당 권한이 없는 사람에게 애초에 버튼이 보이지 않도록 만들면 좋을 것 같다. => 수정완료 3-1
 * 
 * 3-1
 * 진행 사항:
 * 권한이 없는 사람에게 버튼이 안 보이도록 만들었다.
 */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ViewPost.css';
import './CreatePost.css';

const ViewPost = () => {
  const [post, setPost] = useState({title: '', content: ''});
  const [updatePost, setUpdatePost] = useState({Post_Title: '', Post_Content: ''});
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [checkboxes, setCheckboxes] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setUpdatePost(res.data);
        console.log(res.data);
    })
      .catch(err => console.error(err));
    axios.get('http://localhost:8080/checkboxes')
      .then(response => setCheckboxes(response.data))
      .catch(error => console.error('Error fetching checkboxes:', error));
      
    axios.get(`http://localhost:8080/api/updateAuth/${id}`)
      .then((response) => {
        console.log(response.data);
        setIsAuth(true);
      })
      .catch((error) => {
        console.error(error);
      })
  }, [id]);

  const handleCheckboxChange = (itemId) => {
    setSelectedItem(itemId);
  };

  const handleUpdatePost = () => {
    axios.get('http://localhost:8080/auth')
    .then((response) => {
      console.log(response.data);
      setIsEditing(true);
    })
    .catch((error) => {
      console.error(error);
    })
  }
  
  const handleUpdatePostSave = async () => {
    await axios.put(`http://localhost:8080/api/update${id}`, {updatePost, selectedItem})
    .then((res) => {
        console.log('response is = ', res.data);
        navigate('/consulting_review');
    })
    .catch((err) => {
        console.error('update error is = ', err);
        alert('제목, 내용, 태그를 빠짐없이 작성해주세요!')
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
        alert('해당 권한이 없습니다.');
    })
  }

  return (
    <div>
        {isEditing ? (
        <div class="create-main">
        <div class="create-main-frame">
          <div class="create-category">게시글 수정</div>
            <div class="create-title">
              <div>제목</div>
              <input
                class="create-title-input"
                type="text"
                placeholder="제목을 입력해주세요"
                value={updatePost.Post_Title}
                onChange={e => setUpdatePost({ ...updatePost, Post_Title: e.target.value })}
              />
            </div>
          <div class="create-content">
            <div class="">내용</div>
            <textarea
              class="create-content-textarea"
              placeholder="1000자 이내로 작성해주세요"
              value={updatePost.Post_Content}
              onChange={e => setUpdatePost({ ...updatePost, Post_Content: e.target.value })}
            />
          </div>
          <div class="create-tags">
            <div class="create-title-word">태그</div>
            {checkboxes.map((checkbox) => (
              <label class="create-tag" key={checkbox.id}>
                <input
                  type="checkbox"
                  checked={selectedItem === checkbox.id}
                  onChange={() => handleCheckboxChange(checkbox.id)}
                />
                {checkbox.label}
              </label>
            ))}
          </div>
          <div class="create-button-wrap">
            <div class="create-button" onClick={handleUpdatePostSave}><p>게시글 수정하기</p></div>
          </div>
        </div>
      </div>
        ) : (
        <div class="view-main">
          <div class="view-top">
            <div class="view-top-title-wrap">
              <div class="view-top-title">
                <div class="view-post-title" id="Post-Title">제목</div>
                <p class="view-post-title-class">{post.Post_Title}</p>
              </div>
            </div>
            <div class="view-top-content-wrap">
              <div class="view-top-content">
                <div class="view-post-content-subtitle" id="Post-Num">작성번호</div>
                <p class="view-post-content-class">{post.Post_Num}</p>
                <div class="view-post-content-subtitle" id="Post-Tag">태그</div>
                <p class="view-post-content-class">{post.Post_Tag}</p>
                <div class="view-post-content-subtitle" id="Post-User">작성자</div>
                <p class="view-post-content-class">{post.Post_ID}</p>
                <div class="view-post-content-subtitle" id="Post-Date">작성날짜</div>
                <p class="view-post-content-class">{post.Post_Date}</p>
              </div>
            </div>
          </div>
          <div class="view-mid">
            <div class="view-mid-wrap">
              <div class="view-mid-content">
                <div class="view-mid-content-subtitle" id="Post-Content">내용</div>
                <p class="view-mid-content-class">{post.Post_Content}</p>
              </div>
            </div>
          </div>
          {isAuth ? (
          <div class="view-buttons">
            <div class="view-button" id="Post-Update" onClick={handleUpdatePost}>게시글 수정</div>
            <div class="view-button" id="Post-Delete" onClick={handleDeletePost}>게시글 삭제</div>
          </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewPost;