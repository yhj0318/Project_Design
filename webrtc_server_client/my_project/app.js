const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// mysql 연결 설정
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234qwer",
  database: "test_webrtc",
});

// musql 연결
connection.connect((err) => {
  if (err) {
    console.error("MySQL connection failed: " + err.stack);
    return;
  }
  console.log("Cpnnected to MySQL as id " + connection.threadID);
});

//app.use(cors()); // 모든 출처에서 요청을 허용

app.use(
  cors({
    origin: "http://localhost:8081", // 특정 출처의 요청만 허용합니다.
  })
);

// 루트 엔드포인트
app.get("/", (req, res) => {
  // 클라이언트로부터의 요청을 받으면 데이터베이스를 조회
  connection.query("SELECT * FROM users", (error, results, fields) => {
    if (error) {
      // 데이터베이스 조회 중 에러가 발생하면 에러 응답을 클라이언트에게 보냄
      res.status(500).json({ error: "Internal server error" });
    } else {
      // 데이터베이스 조회 결과를 클라이언트에게 응답으로 보냄
      res.json(results);
    }
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
