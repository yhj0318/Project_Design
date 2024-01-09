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
 * DB에 적재가 가능하고 로그인도 가능하지만 클라이언트와의 송수신 과정에서 알림 주는 기능이 동작하지 않는 문제점이 있다. send와 status에 문제가 있는 것 같다. 수정 예정
 * 
 * 1-4
 * 진행 사항:
 * 로그인을 위해 jsonwebtoken 설치
 * 서버를 즉각 확인하기 위해 nodemon 설치
 */
const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(express.json());
var cors = require('cors');
app.use(cors());

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'flej12153473',
  database : 'login_test'
});

connection.connect((err) => {
  if(err){
    console.log('Error connection to MySQL: ', err);
    throw err;
  }
  else{
    console.log("Connection to MySQL database");
  }
});

app.use(express.static(path.join(__dirname, '..', 'React_Web_Page/build')));

app.get('/', async (req, res) =>
{
    res.sendFile(path.join(__dirname, '..', 'React_Web_Page/build/index.html'));
});

app.post('/sign', async (req, res) => {
  const { id, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id, password: hashedPassword };
  connection.query('INSERT INTO users SET ?', user, (error, results) => {
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
    connection.query('SELECT * FROM users WHERE id = ?', [id], async (error, results) => {
      if (error) {
        console.error('Error during login:', error);
        console.log('Error during login');
        res.status(500).send('Error during login');
      }
      if (results.length > 0) {
        const match = await bcrypt.compare(password, results[0].password);
        if (match) {
            const token = jwt.sign(id, 'secretToken');
            id.token = token;
            res.cookie("x_auth", )
            console.log(id, "is Login");
            res.status(200).send('Login successful');
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

app.listen(8080, () => {
  console.log('listening on 8080');
}); 

app.get('*', async (req, res) =>
{
    res.sendFile(path.join(__dirname, '..', 'React_Web_Page/build/index.html'));
});