import http from "http";
import express from "express";
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log("Listen on http://localhost:3000");

const server = http.createServer(app); // http server에 접근

const wss = new WebSocket.Server({ server }); // http 서버 위에 webSocket server 생성

const sockets = []; // 서버에 누군가 연결 시, 그 연결을 넣음
wss.on("connection", (socket) => {
  sockets.push(socket);
  console.log("Connected to Browser");
  socket.on("close", () => console.log("Disconnected from the Browser"));
  socket.on("message", (message, isBinary) => {
    message = isBinary ? message : message.toString();
    sockets.forEach((socket) => socket.send(message));
  });
});

server.listen(3000, handleListen);
