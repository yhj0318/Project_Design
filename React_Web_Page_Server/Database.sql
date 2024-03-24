/**
1-4 
진행 사항:
데이터베이스에 대한 정의를 작성
2-1 
진행 사항:
게시판 데이터베이스를 정의
3-19
진행 사항:
회원가입을 위한 이름과 마이페이지 이미지를 위한 데이터베이스를 정의
3-20
진행 사항:
이미지주소와 자기소개 스키마를 작성
3-24
진행 사항:
예약 데이터베이스를 정의
*/
CREATE DATABASE login_test;

CREATE TABLE users(
    id VARCHAR(45) NOT NULL PRIMARY KEY,
    password VARCHAR(100) NOT NULL,
    token VARCHAR(500),
    email VARCHAR(50) NOT NULL,
    phoneNumber VARCHAR(15) NOT NULL,
    adress VARCHAR(100) NOT NULL,
    lawyer VARCHAR(10) NOT NULL,
    name VARCHAR(5) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    aboutSelf VARCHAR(1000)
);

/*최초 테이블 정의 이후에 추가할 스키마가 있다면 사용*/
ALTER TABLE users ADD COLUMN phoneNumber VARCHAR(15) NOT NULL;
ALTER TABLE users ADD COLUMN email VARCHAR(50) NOT NULL;
ALTER TABLE users ADD COLUMN adress VARCHAR(100) NOT NULL;
ALTER TABLE users ADD COLUMN lawyer VARCHAR(10) NOT NULL;
ALTER TABLE users ADD COLUMN name VARCHAR(5) NOT NULL;
ALTER TABLE users ADD COLUMN image_path VARCHAR(255) NOT NULL;
ALTER TABLE users ADD COLUMN aboutSelf VARCHAR(1000);

SELECT * FROM users;

CREATE DATABASE post_test;

CREATE TABLE posts(
    Post_Num INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    Post_ID VARCHAR(45) NOT NULL, 
    Post_Title VARCHAR(100) NOT NULL, 
    Post_Date DATE NOT NULL TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    Post_Tag VARCHAR(10) NOT NULL,
    Post_Content VARCHAR(1000) NOT NULL
);

CREATE DATABASE reserve_test;

CREATE TABLE reserve(
    Reserve_Num INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Reserve_Lawyer VARCHAR(10) NOT NULL,
    Reserve_User VARCHAR(10) NOT NULL,
    Reserve_Date VARCHAR(20) NOT NULL,
    Reserve_Time VARCHAR(20) NOT NULL,
    Reserve_Consulting VARCHAR(10) NOT NULL
);