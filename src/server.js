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
const wsServer = SocketIO(httpServer)

wsServer.on('connection', socket => {
  console.log(socket)
})

httpServer.listen(3000, handleListen);
