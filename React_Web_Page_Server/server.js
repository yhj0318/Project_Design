/**
 * 12-30
 * 진행 사항:
 * 로그인/가입을 위한 서버를 만들었다.
 * express 서버로 열었고, DB는 mysql로 연결했다.
 * 테스트 DB에 대한 정보는 다음과 같다.
 * users테이블에 id와 password 컬럼이 등록 되어있다.
 * id는 varchar(45) not null primary key
 * password는 varchar(100) not null
 * 비밀번호 암호화를 위해 bcrypt를 사용하여 데이터베이스에 입력되는 값은 해시값이다.
 * cors이슈를 해결하기 위해 코드를 추가하였다.
 * DB에 연결하기 위한 host, user, password, database는 개발환경에 따라 다르다.
 * DB에 적재가 가능하고 로그인도 가능하지만 클라이언트와의 송수신 과정에서 알림 주는 기능이 동작하지 않는 문제점이 있다. 
 * send와 status에 문제가 있는 것 같다. 수정 예정 => 1-9 클라이언트에서 서버로의 주소가 문제였다. 수정완료
 * 
 * 1-4
 * 진행 사항:
 * 로그인을 위해 jsonwebtoken 설치
 * 서버를 즉각 확인하기 위해 nodemon 설치
 * 
 * 1-10
 * 진행 사항:
 * 데이터베이스에 token 스키마를 추가하였다.
 * 로그인 유지를 위해 토큰과 쿠키를 만들어 진행했다.
 * cookie-parser 설치
 * 서버와 클라이언트간 토큰이 일치하는지 확인하기 위해 auth라는 미들웨어를 만들었다.
 * 로그아웃 기능을 간단하게 구현했다.
 * 앞으로 어떤 기능이던 로그인 유지를 판단하려면 auth를 활용하여 사용자가 로그인이 되어있는지 확인이 가능하다.
 * 클라이언트에서 서버가 주는 정보를 바탕으로 어떠한 행동을 할지는 아직 정의하지 않았다.
 * 따라서 서버에서의 정의는 끝났음으로 클라이언트에서 동작하는걸 수정할 예정이다.
 * 
 * 1-14
 * 진행 사항:
 * 로그아웃 로직에서 요청한 클라이언트의 쿠키값이 조회가 안 된다. 어떻게든 요청한 클라이언트와
 * 데이터베이스에 토큰값과 일치한다면 로그아웃을 진행하도록 만들어야한다.
 * 
 * 1-15
 * 진행 사항:
 * CORS 오류로 인해 쿠키값이 전송이 안 되는 문제가 발생하였다.
 * Set-cookie에는 값이 존재하지만 Application Storage에 들어가면 쿠키가 존재하지 않았다.
 * 따라서 이것을 해결하고자 cors에 3000번 포트의 주소를 신뢰하도록 만들고, credentials를 true로 설정해주었다.
 * 결과 쿠키값이 제대로 송신되고 수신받게 되었다.
 * 
 * 2-1
 * 진행 사항:
 * 게시판 작업 CRUD 중 R기능을 적용하였다.
 * get요청을 받은 서버는 post_test 데이터베이스에 테스트값을 반환한다.
 * 
 * 2-3
 * 진행 사항:
 * 게시판 작업 C기능을 적용하였다.
 * 클라이언트로부터 제목 내용 태그를 post요청으로 받아 데이터베이스에 추가해준다.
 * 체크박스 기능을 추가하기 위해 checkboxes를 만들어줬고, get요청이 오면 이 자료를 뿌려주도록 만들었다.
 * 
 * 2-5
 * 진행 사항:
 * 상세페이지를 만들기 위해 posts/:id 엔드포인트를 주고 해당 페이지를 보여주도록 만들었다.
 * 게시판 작업 D기능을 적용하였다.
 * 삭제를 위한 작업을 했고 해당 ID에 컬럼을 전부 삭제하도록 쿼리문을 작성하였다.
 * 게시판 작업 U기능 일부를 적용하였다.
 * 
 * 2-8
 * 진행 사항:
 * 게시판 작업을 모두 끝마쳤다.
 * 업데이트를 위한 API를 작성했고, 로그아웃시 x_auth가 이름인 쿠키를 삭제하도록 로그아웃 API에 코드를 수정했다.
 * 
 * 2-27
 * 진행 사항:
 * 게시글 검색 및 페이지 기능을 수행하기 위해 API를 추가했다.
 * 페이지 기능을 하기위해 기존에 post에 페이지 값을 추가하였고, 10개의 게시물만 보이도록 설정했다.
 * 검색 API를 추가하여 검색시 해당 검색어중 제목, 내용, 태그 어느 하나라도 일치한다면 결과를 보여주도록 작성했다.
 * 
 * 2-29
 * 진행 사항:
 * 게시글 작성 기능 중 제목, 내용, 태그 어느 하나라도 없다면 작성이 안 되도록 작성했다.
 * 검색시 페이지를 확인하기 위해 검색 API에도 페이지 확인을 위한 로직을 추가했다.
 * 
 * 3-1
 * 진행 사항:
 * 게시글 디테일 페이지에서 해당 사용자가 유효한지 아닌지 판단하는 조건문을 추가했다.
 * 
 * 3-17
 * 진행 사항:
 * 마이페이지에 유저데이터를 가져오기 위한 API, 예약하기 페이지에 변호사 데이터를 가져오기 위한 API를 설계했다.
 * 
 * 3-19
 * 진행 사항:
 * 마이페이지 프로필을 설정하기 위한 multer 라이브러리를 설치 후 프로필 업로드 API 그리고 프로필을 볼 수 있도록 API를 만들었다.
 * 서버 스토리지 uploads 폴더에 이미지 파일을 업로드하고, 그 파일을 보여주도록 만들었다.
 * 업로드할 때 해당 유저 DB에 스토리지 주소를 넣고 그 이미지를 띄우도록 설계했다.
 * 
 * 3-20
 * 진행 사항:
 * 자기소개 페이지에 들어가는 자기소개 스키마를 불러오도록 userData API를 수정했다.
 * 
 * 3-21
 * 진행 사항:
 * 마이페이지 수정하기 위한 userDataUpdate API를 만들었다.
 * 
 * 3-24
 * 진행 사항:
 * 마이페이지 프로필을 업로드, 표현하기 위해 multer 라이브러리를 설치했다.
 * profileImage API에서 쿼리 결과가 ''일때 조건문을 통과하는 문제를 발견
 * 이를 해결하고자 결과값이 ''가 아닐때 false가 되도록 만들었다.
 * false일때 default 이미지를 보내도록 만들었다.
 * lawyerProfile/:id API를 만들었다.
 * 해당 API는 id에 해당하는 변호사 프로필을 불러오는 API이다. 이 또한 프로필이 없을 경우 default 이미지를 보낸다.
 * api/reserve API를 만들었다.
 * 이 API는 예약 기능으로 클라이언트로부터 자료를 받아 예약테이블에 INSERT하는 기능이다.
 * reserveList API를 만들었다.
 * 이 기능은 클라이언트가 마이페이지에 예약한 리스트를 출력하는 기능이다.
 * consultingCheckboxes API는 예약하기 페이지에 상담유형 체크박스를 만들기위해 만들었다.
 * 
 * 5-12
 * 진행 사항:
 * 예약 비활성화 기능을 구현하기 위해 moment를 설치했다. 추가로 영국 시간대가 기준이라 momnet-timezone도 설치했다.
 * 이 기능을 사용하여 한국 표준시로 바꾸는데 성공했고, 이를 바탕으로 날짜와 시간을 나눠 데이터베이스에 저장하여,
 * 비활성화 되는 시간대를 저장했다. 이를 바탕으로 값을 조회해서 비활성화가 가능하고, 마이페이지에 날짜와 시간을 추가하여
 * json으로 전달하도록 만들었다. 
 * 
 * 5-18
 * 진행 사항:
 * 상담예약 시간 기준으로 전후 10분간만 상담페이지에 접근할 수 있도록 만들었다.
 * 예를들어 11시00분에 예약이면 10시50분 ~ 11시10분까지 접근이 가능하고, 10시50분 이전에는 상담대기라고 뜬다.
 * 그리고 11시10분을 넘어가면 상담종료라고 나타난다.
 */
const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const moment = require('moment');
require('moment-timezone');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.use(express.json());
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials:true
}));
app.use(cookieParser());

const User_DB = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'flej12153473',
  database : 'login_test'
});

const Post_DB = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'flej12153473',
  database : 'post_test'
});

const Reserve_DB = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'flej12153473',
  database : 'reserve_test'
});

const checkboxes = [
  { id: '민사', label: '민사' },
  { id: '상사', label: '상사' },
  { id: '형사', label: '형사' },
  { id: '노동', label: '노동' },
  { id: '조세', label: '조세' },
  { id: '지적재산권', label: '지적재산권' },
  { id: '국제관계', label: '국제관계' },
  { id: '행정', label: '행정' },
  { id: '가사', label: '가사' },
  // 추가적인 체크박스 항목들을 필요에 따라 추가할 수 있습니다.
];

const userCheckboxes = [
  {id: '일반사용자', label: '일반사용자'}, 
  {id: '변호사', label: '변호사'}
];

const consultingCheckboxes = [
  {id: '채팅상담', label: '채팅상담'}, 
  {id: '영상상담', label: '영상상담'}
];

User_DB.connect((err) => {
  if(err){
    console.log('Error User_DB is connection to MySQL: ', err);
    throw err;
  }
  else{
    console.log("User_DB is connection to MySQL database");
  }
});

Post_DB.connect((err) => {
  if(err){
    console.log('Error Post_DB is connection to MySQL: ', err);
    throw err;
  }
  else{
    console.log("Post_DB is connection to MySQL database");
  }
});


app.use(express.static(path.join(__dirname, '..', 'React_Web_Page/build')));

app.get('/', async (req, res) =>
{
    res.sendFile(path.join(__dirname, '..', 'React_Web_Page/build/index.html'));
});

app.post('/sign', async (req, res) => {
  const defaultImage = 'uploads\\default.png';
  const { id, password, userName, email, adress, phoneNumber, userSelect } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { image_path: defaultImage ,id, password: hashedPassword, email, name: userName, adress, phoneNumber, lawyer: userSelect };
  User_DB.query('INSERT INTO users SET ?', user, (error, results) => {
    if (error) {
      console.error('Error registering user:', error);
      console.log('Error registering user');
      res.status(500).send('Error registering user');
    } else {
      console.log('User registered successfully');
      res.status(200).send('User registered successfully')
    }
});
});

app.post('/login_sign', (req, res) => {
    const { id, password } = req.body;
    User_DB.query('SELECT * FROM users WHERE id = ?', [id], async (error, results) => {
      if (error) {
        console.error('Error during login:', error);
        console.log('Error during login');
        res.status(500).send('Error during login');
      }
      if (results.length > 0) {
        const match = await bcrypt.compare(password, results[0].password);
        if (match) {
          /**
           * 'secretToken'을 복호화를 위한 키값으로 두고 토큰을 생성한다.
           * 생성된 토큰은 해당 id에 일치하는 컬럼에 업데이트 해준다.
           * 클라이언트에 쿠키를 전송하는데 'x_auth'라는 이름과 token이라는 값으로 쿠키를 전송한다.
           */
            const token = jwt.sign({userID: id}, 'secretToken');
            console.log(token);
            User_DB.query('UPDATE users SET token = ? WHERE id = ?', [token, id], (updateError, updateResults)=>{
              if(updateError){
                console.log(updateError);
                return res.status(400).send(updateError);
              }
              console.log('query result == ', token);
              res.cookie("x_auth", token)
              .status(200)
              .json({loginSuccess: true, userId: id})
            });
            console.log(results[0].id, "is Login");
          } else {
            console.log('Invalid password');
            res.status(400).send('Invalid password');
        }
      } else {
        console.log('User not found');
        res.status(404).send('User not found');
      }
    });
});

/**
 * 클라이언트와 서버에 존재하는 토큰이 일치하는지 확인하는 미들웨어이다.
 */
app.get('/auth', verifyToken, async (req, res) => {
  res.json({
    userID : req.userID,
    message: 'This is secure data!' 
  });
});

/**
 * 쿠키에서 토큰을 가져오고, 유효한 토큰인지 확인하고, 유효하다면 암호화된 토큰을 복호화 시켜서 
 * 데이터베이스와 일치하는 토큰을 찾고 복호화된 아이디를 req로 넘겨준다. 반환값 req.userID
 */
function verifyToken(req, res, next) {
  const token = req.cookies.x_auth; // 쿠키에서 토큰 가져오기
  console.log('verifyToken in token is = ', req.cookies);
  console.log('token is = ', token);
  if (!token) {
    return res.status(401).json({ message: 'Token is not provided' });
  }
  // verify 메서드로 복호화를 진행한다.
  jwt.verify(token, 'secretToken', (err, decoded) => {
    console.log('decoded is = ', decoded);
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    User_DB.query('SELECT id FROM users WHERE token = ?', [token], (error, results) => {
      if (error || results.length === 0) {
        return res.status(401).json({ message: 'User not found or invalid token' });
      }
      req.userID = results[0].id; // 사용자 ID 저장
      console.log('req.userID is = ', req.userID);
      next();
    });
  });
}

/**
 * 마찬가지로 토큰이 일치하는지 확인을 위해 verifyToken 함수를 실행
 * 일치한다면 데이터베이스에서 해당 id랑 일치하는 컬럼에 token 값을 공백으로 업데이트 해준다.
 */
app.get('/logout',verifyToken, async (req, res) => {
  User_DB.query('SELECT * FROM users WHERE id = ?', [req.userID], (error, results) => {
    if (error || results.length === 0) {
      return res.status(401).json({ message: 'User not defined' });
    }
    else {
      User_DB.query('UPDATE users SET token = "" WHERE id = ?', [req.userID])
      console.log('logout successful!');
      res.clearCookie('x_auth').status(200).send({logout : 'true'});
    }
  })
});

app.get('/api/posts', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  Post_DB.query('SELECT COUNT(*) AS totalPosts FROM posts', (error, countResult) => {
    if (error) {
      console.log('total post count error', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    const totalPosts = countResult[0].totalPosts;
    const totalPages = Math.ceil(totalPosts / limit);

    // 마지막 페이지인지 확인
    if (page > totalPages) {
      res.status(404).json({ error: 'Page not found' });
      return;
    }

  Post_DB.query('SELECT Post_ID, Post_Title, Post_Tag, Post_Num, DATE_FORMAT(Post_Date, "%Y-%m-%d") AS Post_Date FROM posts ORDER BY Post_Num DESC LIMIT ? OFFSET ?', [limit, offset], (error, results) => {
    if (error){
      console.log('post read error', error);
    }
    else{
      console.log('post read successful');
      console.log('results is = ', results);
      res.json(results);
    }
    });
  });
});

app.get('/api/posts/:id', (req, res) => {
  const postID = req.params.id;
  Post_DB.query('SELECT Post_ID, Post_Title, Post_Content, Post_Tag, Post_Num, DATE_FORMAT(Post_Date, "%Y-%m-%d") AS Post_Date FROM posts WHERE Post_Num = ?', [postID], (error, results) => {
    if (error){
      console.log('post read error', error);
    }
    else{
      console.log('post id read successful');
      console.log('results is = ', results);
      res.json(results[0]);
    }
  });
});
// 게시글 작성을 위한 요청 토큰을 확인하여 어떤 작성자인지 확인하고 데이터베이스에 저장
// 제목, 내용, 태그 중 하나라도 비어있다면 작성이 안 되도록 작성
app.post('/api/create', verifyToken, async (req, res) => {
  const { title, content} = req.body.newPost;
  const selectItem = req.body.selectedItem;
  if(title === '' || content == '' || selectItem == null){
    res.status(401).json({error : 'Not Null'});
    return;
  }
  Post_DB.query('INSERT INTO posts (Post_ID, Post_Title, Post_Content, Post_Tag) VALUES (?, ?, ?, ?)', [req.userID, title, content, selectItem], (error, results) => {
    if (error){
      console.log('create Post error', error);
    }
    else{
      res.json('createPost successful');
    }
  });
})

app.put('/api/update:id', verifyToken, async (req, res) => {
  // 이 부분에는 생성하는 것과 마찬가지로 제목과 내용 태그를 받아 UPDATE쿼리를 적용해주면 된다.
  const { Post_Title, Post_Content} = req.body.updatePost;
  const selectItem = req.body.selectedItem;
  const postID = req.params.id;
  Post_DB.query('UPDATE posts SET Post_ID = ?, Post_Title = ?, Post_Content = ? ,Post_Tag = ? WHERE Post_Num = ?', [req.userID, Post_Title, Post_Content, selectItem, postID], (error, results) => {
    if (error){
      console.log('update Post error', error);
    }
    else{
      res.json('updatePost successful');
    }
  });
})
// 요청자와 게시글의 작성자가 일치하는지 확인하는 API 일치한다면 수정하기 삭제하기 버튼 활성화
app.get('/api/updateAuth/:id', verifyToken, (req, res) => {
  console.log('req.params.id is = ', req.params.id);
  const postID = req.params.id;
  Post_DB.query('SELECT Post_ID FROM posts WHERE Post_Num = ?', [postID], (error, UserResult) => {
    if(UserResult[0].Post_ID === req.userID){
      res.json('updateAuth Secure Data');
    }
    else{
      res.status(401).json({Error : 'This is not secure'});
      return;
    }
  })
})
app.delete('/api/delete/:id', verifyToken, async (req, res) => {
  const postID = req.params.id;
  console.log(postID)
  Post_DB.query('SELECT Post_ID FROM posts WHERE Post_Num = ?', [postID], (error, UserResult) => {
    if(UserResult[0].Post_ID === req.userID){
      Post_DB.query('DELETE FROM posts WHERE Post_Num = ?', [postID], (error, results) => {
        if(error){
          console.log('delete post error is = ', error);
        }
        else{
          res.json('deletePost successful');
        }
      })
    }
    else{
      res.status(401).json({Error : 'This is not secure'});
      return;
    }
  })
})

app.get('/api/search/:searchLine', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;
  const postSearchLine = req.params.searchLine;
  console.log(postSearchLine);
  
  Post_DB.query('SELECT COUNT(*) AS totalPosts FROM posts WHERE Post_Title LIKE ? OR Post_Content LIKE ? OR Post_Tag LIKE ? ', [`%${postSearchLine}%`, `%${postSearchLine}%`,`%${postSearchLine}%`], (error, countResult) => {
    if (error) {
      console.log('total post count error', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    const totalPosts = countResult[0].totalPosts;
    const totalPages = Math.ceil(totalPosts / limit);

    // 마지막 페이지인지 확인
    if (page > totalPages) {
      res.status(404).json({ error: 'Page not found' });
      return;
    }

  Post_DB.query('SELECT Post_ID, Post_Title, Post_Content, Post_Tag, Post_Num, DATE_FORMAT(Post_Date, "%Y-%m-%d") AS Post_Date FROM posts WHERE Post_Title LIKE ? OR Post_Content LIKE ? OR Post_Tag LIKE ? ORDER BY Post_Num DESC LIMIT ? OFFSET ?', [`%${postSearchLine}%`, `%${postSearchLine}%`,`%${postSearchLine}%`, limit, offset], (error, results) => {
    if (error){
      console.log('post search error', error);
    }
    else{
      console.log('post search successful');
      console.log('results is = ', results);
      res.json(results);
    }
    });
  });
});

app.get('/userdata', verifyToken, (req, res) => {
  User_DB.query('SELECT aboutSelf, name, id, email, phoneNumber, adress, lawyer FROM users WHERE id = ?', [req.userID], (error, results) => {
    if(error){
      console.log('userData error', error);
      res.status(500).json({error: 'user Database error'});
      return;
    }
    else{
      console.log('userDate successful');
      res.json(results[0]);
    }
  })
})

app.get('/lawyerData', (req, res) => {
  User_DB.query('SELECT name, id, email, phoneNumber, adress FROM users WHERE lawyer = ?', ['변호사'], (error, results) => {
    if(error){
      console.log('lawyerData error', error);
      res.status(500).json({error: 'lawyer Database error'});
      return;
    }
    else{
      console.log('lawyerData search successful');
      res.json(results);
    }
  })
})

app.get('/reserve/:lawyerId', (req, res) => {
  const reserveLawyerId = req.params.lawyerId;

  User_DB.query('SELECT name, aboutSelf, id, email, phoneNumber, adress FROM users WHERE id = ?', [reserveLawyerId], (error, results) => {
    if(error){
      console.log('reserve LawyerData error', error);
      res.status(500).json({error: 'lawyer Database error'});
      return;
    }
    else{
      console.log('lawyerData search successful');
      res.json(results);
    }
  })
})

app.get('/mainPost', (req, res) => {
  Post_DB.query('SELECT Post_ID, Post_Title, Post_Content, Post_Tag from posts', (error, results) => {
    if(error){
      console.log('mainPost search error', error);
      res.status(500).json({error: 'mainPost error'});
      return;
    }
    else{
      console.log('mainPost search successful');
      res.json(results);
    }
  })
})

app.post('/profileUpload', verifyToken, upload.single('profileImage'), (req, res) => {
  const imagePath = req.file.path;
  console.log('profileUpload connect = ', imagePath)

  // MySQL에 이미지 경로 저장
  const sql = 'UPDATE users SET image_path = ? WHERE id = ?';
  User_DB.query(sql, [imagePath, req.userID], (error, results, fields) => {
    if (error) {
      console.log('profileUpload database error = ', error)
      throw error;
    }
    console.log('Image uploaded successfully = ', results);
    res.json({ success: true, imagePath });
  });
});

app.get('/profileImage', verifyToken, (req, res) => {
  // MySQL에서 이미지 경로 가져오기
  console.log('profileImage connect');
  const sql = 'SELECT image_path FROM users WHERE id = ?';
  User_DB.query(sql, [req.userID] ,(error, results, fields) => {
    if (error) throw error;
    if ((results.length > 0) && (results[0].image_path != '')) {
      const imagePath = results[0].image_path;
      const absoluteImagePath = path.join(__dirname, imagePath);
      console.log('absoluteImagePath is = ', absoluteImagePath);
      // 이미지 파일을 클라이언트에게 보냅니다.
      res.sendFile(absoluteImagePath, {headers: {
        'Content-Type': 'image/png' // 이미지 유형에 맞게 Content-Type을 설정합니다. 여기서는 jpeg 파일을 가정합니다.
      }});
    } else {
      const defaultImage = 'uploads\\default.png';
      const defaultImagePath = path.join(__dirname, defaultImage);
      console.log(defaultImagePath)
      res.sendFile(defaultImagePath, {headers: {
        'Content-Type': 'image/png' // 이미지 유형에 맞게 Content-Type을 설정합니다. 여기서는 jpeg 파일을 가정합니다.
      }});
    }
  });
});

app.put('/userDataUpdate', verifyToken, async (req, res) => {
  // 이 부분에는 생성하는 것과 마찬가지로 제목과 내용 태그를 받아 UPDATE쿼리를 적용해주면 된다.
  console.log(req.body.userUpdateData)
  const { email, phoneNumber, adress, aboutSelf} = req.body.userUpdateData;
  User_DB.query('UPDATE users SET email = ?, phoneNumber = ?, adress = ?, aboutSelf = ? WHERE id = ?', [email, phoneNumber, adress, aboutSelf, req.userID], (error, results) => {
    if (error){
      console.log('update userData error', error);
    }
    else{
      res.json('updateUserData successful');
    }
  });
})

app.get('/lawyerProfile/:id', (req, res) => {
  // MySQL에서 이미지 경로 가져오기
  const lawyerId = req.params.id;
  console.log('lawyerProfile connect');
  const sql = 'SELECT image_path FROM users WHERE id = ?';
  User_DB.query(sql, [lawyerId] ,(error, results, fields) => {
    if (error) throw error;
    if ((results.length > 0) && (results[0].image_path != '')) {
      const imagePath = results[0].image_path;
      console.log('imagePath is = ', imagePath);

      const absoluteImagePath = path.join(__dirname, imagePath);
      console.log('absoluteImagePath is = ', absoluteImagePath);
      // 이미지 파일을 클라이언트에게 보냅니다.
      res.sendFile(absoluteImagePath, {headers: {
        'Content-Type': 'image/png' // 이미지 유형에 맞게 Content-Type을 설정합니다. 여기서는 jpeg 파일을 가정합니다.
      }});
    } else {
      const defaultImage = 'uploads\\default.png';
      const defaultImagePath = path.join(__dirname, defaultImage);
      res.sendFile(defaultImagePath, {headers: {
        'Content-Type': 'image/png' // 이미지 유형에 맞게 Content-Type을 설정합니다. 여기서는 jpeg 파일을 가정합니다.
      }});
    }
  });
});

app.post('/api/reserve', verifyToken, (req, res) => {
  const selectedDateTime = req.body.selectedDateTime;
  const consulting = req.body.userSelect;
  const lawyerID = req.body.lawyerId;
  Reserve_DB.query('INSERT INTO reserve (Reserve_Lawyer, Reserve_User, Reserve_DateTime, Reserve_Consulting) VALUES (?, ?, ?, ?)', [lawyerID, req.userID, selectedDateTime, consulting], (error, results) => {
    if(error){
      console.log('reserve is error = ', error)
    }
    else{
      res.send('Reserve is successful');
    }
  })
});

app.get('/reserveList', verifyToken, (req, res) => {
  Reserve_DB.query('SELECT NOW() AS currentDateTime, Reserve_Num, Reserve_Lawyer, Reserve_User, Reserve_DateTime, Reserve_Consulting FROM reserve WHERE Reserve_User = ? OR Reserve_Lawyer = ? ORDER BY Reserve_Num DESC' , [req.userID, req.userID], (error, results) => {
    if(error) throw error;
    if((results.length > 0)){
      let dataList = [];
      let currentList = [];
      for(let data of results){
        dataList.push(data.Reserve_DateTime);
      };
      for(let data of results){
        currentList.push(data.currentDateTime);
      };
      const dataListArray = dataList.map(item => {
        const dateTime = moment(item).clone().tz('Asia/Seoul');
        return dateTime.format('YYYY-MM-DD HH:mm');
      });
      const currentDateTime = currentList.map(item => {
        const dateTime = moment(item).clone().tz('Asia/Seoul');
        return dateTime.format('YYYY-MM-DD HH:mm');
      });
      console.log(dataListArray);
      console.log(currentDateTime);
      const jsonDataArray = dataListArray.map(dateTimeString => {
        const [Reserve_Date, Reserve_Time] = dateTimeString.split(' ');
        return { Reserve_Date, Reserve_Time };
      });
      console.log(jsonDataArray)
      console.log(results)

      const comparisonResult = dataListArray.map((dateTime, index) => {
        const specificDateTime = new Date(dataListArray[index]);
        const curruntD = new Date(currentDateTime[index]);
        console.log('curruntD is = ', curruntD)
        console.log(specificDateTime)
        const tenMBefore = new Date(specificDateTime.getTime() - 10 * 60000);
        console.log('tenMBefore is = ', tenMBefore)
        const tenMAfter = new Date(specificDateTime.getTime() + 10 * 60000);
        console.log('tenMAfter is = ', tenMAfter)
        console.log(currentDateTime[index])
        const isWithinTenMinutes = curruntD >= tenMBefore && curruntD <= tenMAfter;
        const isEnd = tenMAfter <= curruntD;
        if(isWithinTenMinutes == true && isEnd == false) {
          return {isAfter: '상담시작'};
        }
        if(isWithinTenMinutes == false && isEnd == false){
          return {isAfter: '상담대기'};
        }
        if(isEnd == true){
          return {isAfter: '상담종료'};
        }
      });
      console.log('comparisonResult1 is = ', comparisonResult)
      const mergedResults = results.map((result, index) => {
        return {
          ...result,
          Reserve_Date: jsonDataArray[index].Reserve_Date,
          Reserve_Time: jsonDataArray[index].Reserve_Time,
          Reserve_DateTime: dataListArray[index],
          currentDateTime: currentDateTime[index],
          ...comparisonResult[index],
        };
      });
      console.log(mergedResults);

      res.json(mergedResults);
    } else{
      console.log('reserve is error = ', error);
      res.status(500).json({error: 'reserveList error'});
    }
  })
});

app.get('/checkReserved/:lawyerId', (req, res) => {
  const reserveLawyerId = req.params.lawyerId;
  Reserve_DB.query('SELECT Reserve_DateTime FROM reserve WHERE Reserve_Lawyer = ?', [reserveLawyerId], (error, results) => {
    if(error) throw error;
    if((results.length > 0)){
      let dataList = [];
      for(let data of results){
        dataList.push(data.Reserve_DateTime);
      };
      const dataListArray = dataList.map(item => {
        const dateTime = moment(item).clone().tz('Asia/Seoul');
        return dateTime.format('YYYY-MM-DD HH:mm');
      });
      console.log(dataListArray);
      res.json(dataListArray);
    }
    else{
      console.log('checkReserved is error = ', error);
      res.status(500).json({eror: 'checkReserved error'});
    }
  })
})
app.get('/checkboxes', (req, res) => {
  res.json(checkboxes);
});

app.get('/userCheckboxes', (req, res) => {
  res.json(userCheckboxes);
});

app.get('/consultingCheckboxes', (req, res) => {
  res.json(consultingCheckboxes);
});

app.listen(8080, () => {
  console.log('listening on 8080');
}); 

app.get('*', async (req, res) =>
{
    res.sendFile(path.join(__dirname, '..', 'React_Web_Page/build/index.html'));
});