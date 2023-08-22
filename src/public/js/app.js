const socket = io();

const welcom = document.getElementById("welcome");
const form = welcom.querySelector("form");

function backendDone() { // front에서 실행할 코드 
  console.log("backend done");
}

function handleRoomSubmit(e) {
  e.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, backendDone);//  backend에 input.value, backendDone를 보냄
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
