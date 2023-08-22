const socket = io();

const welcom = document.getElementById("welcome");
const form = welcom.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage (message) {
  const ul = document.querySelector('ul')
  const li = document.createElement('li')
  li.innerText = message
  ul.appendChild(li)
}

function showRoom() {
  // front에서 실행할 코드
  welcom.hidden = true;
  room.hidden = false;

  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`
}

function handleRoomSubmit(e) {
  e.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);


socket.on("welcome", () => {
  addMessage('Someone joined!')
})

socket.on('bye', () => {
  addMessage('Someone left 😢')
})