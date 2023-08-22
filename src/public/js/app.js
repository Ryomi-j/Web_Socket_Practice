const socket = io();

const welcom = document.getElementById("welcome");
const form = welcom.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function handleMessageSubmit(e) {
  e.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

function showRoom() {
  welcom.hidden = true;
  room.hidden = false;

  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const msgForm = room.querySelector("#msg");
  msgForm.addEventListener("submit", handleMessageSubmit);
}

function handleRoomSubmit(e) {
  e.preventDefault();
  const nicknameInput = form.querySelector("#nickname");
  const roomNameInput = form.querySelector("#roomName");

  socket.emit('nickname', nicknameInput.value)

  socket.emit("enter_room", roomNameInput.value, showRoom);
  roomName = roomNameInput.value;
  roomName.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user) => {
  addMessage(`${user} joined!`);
});

socket.on("bye", (user) => {
  addMessage(`${user} left 😢`);
});

socket.on("new_message", addMessage);