import http from "http";
import express from "express";
import SocketIO from "socket.io";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log("Listen on http://localhost:3000");

const httpServer = http.createServer(app); // http server에 접근
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (roomName, done) => {
    console.log(roomName)

    setTimeout(() => {
      done() // 보안상의 문제로 frontend에서 코드 실행 (누군가가 db를 지우는 코드를 작성할 수 있음)
    }, 1000)
  });
});

httpServer.listen(3000, handleListen);
