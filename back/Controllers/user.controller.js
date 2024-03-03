const mysql = require('mysql2/promise'); // mysql2의 promise 버전을 사용

const userController = {};
let connection; // connection 변수 선언

// MySQL 연결 설정
(async () => {
  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '0000',
      database: 'login_test'
    });
    console.log('MySQL database connected');
  } catch (error) {
    console.error('MySQL 연결 오류:', error);
  }
})();

// 사용자 정보를 저장하거나 업데이트하는 함수
userController.saveUser = async (userID) => {
  try {
    // 이미 있는 사용자인지 확인
    const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [userID]);
    let user;

    if (rows.length === 0) {
      // 사용자가 존재하지 않으면 새로운 사용자 추가
      const [insertResult] = await connection.execute('INSERT INTO users (id) VALUES (?)', [userID]);
      if (insertResult.affectedRows === 1) {
        // 새로운 사용자가 성공적으로 추가된 경우 사용자 정보 반환
        user = { id: userID };
      } else {
        throw new Error('사용자 추가 실패');
      }
    } else {
      // 이미 존재하는 사용자인 경우 사용자 정보 반환
      user = { id: userID };
    }

    return user;
  } catch (error) {
    console.error('사용자 정보 저장 오류:', error);
    throw new Error('사용자 정보 저장 오류');
  }
};

userController.checkUser = async (userID) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [userID]);
    if (rows.length === 0) {
      throw new Error("User not found");
    }
    // 사용자가 존재하는 경우, 해당 사용자 정보를 반환합니다.
    return rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = userController;