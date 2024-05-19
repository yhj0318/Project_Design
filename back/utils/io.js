const mysql = require('mysql2');
const chatController = require("../Controllers/chat.controller");
const userController = require("../Controllers/user.controller");

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = function (io) {
  io.on("connection", async (socket) => {
    console.log("client is connected", socket.id);

    // 로그인 요청 처리
    socket.on("login", async (userID, cb) => {
      try {
        // MySQL에서 사용자의 토큰 정보를 가져옴
        const [rows] = await connection.promise().query('SELECT token FROM users WHERE id = ?', [userID]);
        console.log("DB에서 조회된 토큰: ", rows[0]?.token); 

        if (rows.length > 0 && rows[0].token) {
          // 로그인 성공 처리
          const user = await userController.saveUser(userID); 
          const welcomeMessage = {
            chat: `${userID} 님이 방에 입장하셨습니다.`,
            user: { id: userID, name: "system" } 
          };
          io.emit("message", welcomeMessage);
          cb({ ok: true, data: user });
        } else {
          console.log('로그인이 필요합니다.');
          cb({ ok: false, error: '로그인이 필요합니다.' });
          // 클라이언트로 해당 메시지를 보냄
          socket.emit("loginRequired", "로그인이 필요합니다.");
        }
      } catch (error) {
        console.error('로그인 처리 에러:', error.message);
        cb({ ok: false, error: error.message });
      }
    });
    
    // 메시지 전송 처리
    socket.on("sendMessage", async (userID, message, cb) => {
      try {
        const user = await userController.checkUser(userID);
        const newMessage = await chatController.saveChat(message, user);
        io.emit("message", newMessage);
        cb({ ok: true });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    // 연결 종료 처리
    socket.on("disconnect", () => {
      console.log("user is disconnected");
    });
  });
};