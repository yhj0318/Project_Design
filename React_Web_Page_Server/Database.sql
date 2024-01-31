/**
1-4 진행 사항:
데이터베이스에 대한 정의를 작성
2-1 진행 사항:
게시판 데이터베이스를 정의
*/
CREATE DATABASE login_test;

CREATE TABLE users(
    id VARCHAR(45) NOT NULL PRIMARY KEY,
    password VARCHAR(100) NOT NULL,
    token VARCHAR(500)
);

ALTER TABLE users ADD COLUMN token VARCHAR(500);

SELECT * FROM users;

CREATE DATABASE post_test;

CREATE TABLE posts(
    Post_Num INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    Post_ID VARCHAR(45) NOT NULL, 
    Post_Title VARCHAR(100) NOT NULL, 
    Post_Date DATE NOT NULL TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    Post_Tag VARCHAR(10) NOT NULL
);