const {createServer} = require("http");
const app = require("./app");
const {Server} = require("socket.io");
require("dotenv").config();

const httpServer = createServer(app);
exports.httpServer = httpServer;
const io = new Server(httpServer, {
    cors:  {
        origin:"http://localhost:3001",
    },
});



require("./utils/io")(io);
httpServer.listen(process.env.PORT, () => {
    console.log("server listening on port", process.env.PORT);
});