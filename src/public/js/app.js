const socket = io();

const welcom = document.getElementById("welcome");
const form = welcom.querySelector("form");

function backendDone () {
  console.log("backend done")
}

function handleRoomSubmit(e) {
  e.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", { payload: input.value }, () => {
    console.log('server is done') // 서버에서 실행할 콜백 / 백엔드에서 호출하지만, 프론트에서 실행됨
  }); // 객체 전송 가능 (socket.io는 객체를 string으로 변환 후 다시 객체로 변환)
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
