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
 */
const express = require("express");
const path = require("path");
const app = express();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(express.json());
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

const User_DB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234qwer",
  database: "login_test",
});

/*
const Post_DB = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'flej12153473',
  database : 'post_test'
});
*/

User_DB.connect((err) => {
  if (err) {
    console.log("Error User_DB is connection to MySQL: ", err);
    throw err;
  } else {
    console.log("User_DB is connection to MySQL database");
  }
});

/*
Post_DB.connect((err) => {
  if (err) {
    console.log("Error Post_DB is connection to MySQL: ", err);
    throw err;
  } else {
    console.log("Post_DB is connection to MySQL database");
  }
});
*/

app.use(express.static(path.join(__dirname, "..", "React_Web_Page/build")));

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "..", "React_Web_Page/build/index.html"));
});

app.post("/sign", async (req, res) => {
  const { id, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id, password: hashedPassword };
  User_DB.query("INSERT INTO users SET ?", user, (error, results) => {
    if (error) {
      console.error("Error registering user:", error);
      console.log("Error registering user");
      res.status(500).send("Error registering user");
    } else {
      console.log("User registered successfully");
      res.status(200).send("User registered successfully");
    }
  });
});

app.post("/login_sign", (req, res) => {
  const { id, password } = req.body;
  User_DB.query("SELECT * FROM users WHERE id = ?", [id], async (error, results) => {
    if (error) {
      console.error("Error during login:", error);
      console.log("Error during login");
      res.status(500).send("Error during login");
    }
    if (results.length > 0) {
      const match = await bcrypt.compare(password, results[0].password);
      if (match) {
        /**
         * 'secretToken'을 복호화를 위한 키값으로 두고 토큰을 생성한다.
         * 생성된 토큰은 해당 id에 일치하는 컬럼에 업데이트 해준다.
         * 클라이언트에 쿠키를 전송하는데 'x_auth'라는 이름과 token이라는 값으로 쿠키를 전송한다.
         */
        const token = jwt.sign({ userID: id }, "secretToken");
        console.log(token);
        User_DB.query("UPDATE users SET token = ? WHERE id = ?", [token, id], (updateError, updateResults) => {
          if (updateError) {
            console.log(updateError);
            return res.status(400).send(updateError);
          }
          console.log("query result == ", token);
          res.cookie("x_auth", token).status(200).json({ loginSuccess: true, userId: id });
        });
        console.log(results[0].id, "is Login");
      } else {
        console.log("Invalid password");
        res.status(400).send("Invalid password");
      }
    } else {
      console.log("User not found");
      res.status(404).send("User not found");
    }
  });
});

/**
 * 클라이언트와 서버에 존재하는 토큰이 일치하는지 확인하는 미들웨어이다.
 */
app.get("/auth", verifyToken, (req, res) => {
  res.json({
    userID: req.userID,
    message: "This is secure data!",
  });
});

/**
 * 쿠키에서 토큰을 가져오고, 유효한 토큰인지 확인하고, 유효하다면 암호화된 토큰을 복호화 시켜서
 * 데이터베이스와 일치하는 토큰을 찾고 복호화된 아이디를 req로 넘겨준다.
 */
function verifyToken(req, res, next) {
  const token = req.cookies.x_auth; // 쿠키에서 토큰 가져오기
  console.log("verifyToken in token is = ", req.cookies);
  console.log("token is = ", token);
  if (!token) {
    return res.json({ message: "Token is not provided" });
  }
  // verify 메서드로 복호화를 진행한다.
  jwt.verify(token, "secretToken", (err, decoded) => {
    console.log("decoded is = ", decoded);
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    User_DB.query("SELECT id FROM users WHERE token = ?", [token], (error, results) => {
      if (error || results.length === 0) {
        return res.status(401).json({ message: "User not found or invalid token" });
      }
      req.userID = results[0].id; // 사용자 ID 저장
      console.log("req.userID is = ", req.userID);
      next();
    });
  });
}

/**
 * 마찬가지로 토큰이 일치하는지 확인을 위해 verifyToken 함수를 실행
 * 일치한다면 데이터베이스에서 해당 id랑 일치하는 컬럼에 token 값을 공백으로 업데이트 해준다.
 */
app.get("/logout", verifyToken, (req, res) => {
  User_DB.query("SELECT * FROM users WHERE id = ?", [req.userID], (error, results) => {
    if (error || results.length === 0) {
      return res.status(401).json({ message: "User not defined" });
    } else {
      User_DB.query('UPDATE users SET token = "" WHERE id = ?', [req.userID]);
      console.log("logout successful!");
      res.status(200).send({ logout: "true" });
    }
  });
});

app.get("/api/posts", async (req, res) => {
  Post_DB.query(
    'SELECT Post_ID, Post_Title, Post_Tag, Post_Num, DATE_FORMAT(Post_Date, "%Y-%m-%d") AS Post_Date FROM posts ORDER BY Post_Num DESC',
    (error, results) => {
      if (error) {
        console.log("post read error");
      } else {
        console.log("post read successful");
        console.log("results is = ", results);
        res.json(results);
      }
    }
  );
});

// 지동근 수정, database에서 예약 조회
app.get("/search", (req, res) => {
  // 클라이언트로부터의 요청을 받으면 데이터베이스를 조회
  User_DB.query("SELECT * FROM users", (error, results, fields) => {
    if (error) {
      // 데이터베이스 조회 중 에러가 발생하면 에러 응답을 클라이언트에게 보냄
      res.status(500).json({ error: "Internal server error" });
    } else {
      // 데이터베이스 조회 결과를 클라이언트에게 응답으로 보냄
      res.json(results);
    }
  });
});

app.listen(8080, () => {
  console.log("listening on 8080");
});

app.get("*", async (req, res) => {
  res.sendFile(path.join(__dirname, "..", "React_Web_Page/build/index.html"));
});
