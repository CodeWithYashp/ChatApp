const socket = io();

let name;
let textarea = document.querySelector("#textarea");
let messagearea = document.querySelector(".message--area");
let audio = new Audio("audio.mp3");

do {
  name = prompt("Please enter your name: ");
} while (!name);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim(),
  };

  //Append
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollMessages();

  //send to server
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;

  mainDiv.classList.add(className, "message");
  let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
  `;

  mainDiv.innerHTML = markup;

  messagearea.appendChild(mainDiv);
}

//Receive Messages
socket.on("message", (msg) => {
  audio.play();
  appendMessage(msg, "incoming");
  scrollMessages();
});

function scrollMessages() {
  messagearea.scrollTop = messagearea.scrollHeight;
}
