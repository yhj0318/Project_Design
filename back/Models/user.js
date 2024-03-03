const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
    return;
  }
  console.log('MySQL 데이터베이스에 연결되었습니다.');

  connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      token VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `, (err, results, fields) => {
    if (err) {
      console.error('테이블 생성 실패:', err);
    } else {
      console.log('테이블이 성공적으로 생성되었습니다.');
    }

    
  });
});

connection.end();