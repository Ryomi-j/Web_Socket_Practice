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
  socket.onAny((e) => console.log(`Socket Event: ${e}`));

  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName)
    done()
    socket.to(roomName).emit('welcome') // 본인을 제외한 모두에게 'welcome' 이벤트 실행
  });

  socket.on('disconnecting', () => {
    socket.rooms.forEach(room => socket.to(room).emit("bye"))
  })
});

httpServer.listen(3000, handleListen);
