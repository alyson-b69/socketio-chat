const socket = io();
const messageInput = document.querySelector("#message");
const messageForm = document.querySelector("#form");
const messages = document.querySelector("#messages");
const usersList = document.querySelector("#users");

String.prototype.toHtmlEntities = function () {
  return this.replace(/./gm, function (s) {
    return s.match(/[a-z0-9\s]+/i) ? s : "&#" + s.charCodeAt(0) + ";";
  });
};

function writeMessage(message, type = "message") {
  let li = document.createElement("li");
  if (type === "broadcast") {
    li.innerText = `👤   ${message}`;
  } else {
    const dateNow = new Date();
    const date =
      ("0" + dateNow.getDate()).slice(-2) +
      "/" +
      ("0" + (dateNow.getMonth() + 1)).slice(-2) +
      "/" +
      dateNow.getFullYear() +
      " - " +
      ("0" + dateNow.getHours()).slice(-2) +
      ":" +
      ("0" + dateNow.getMinutes()).slice(-2);

    li.innerHTML = `<strong>&#128571  ${message.username}</strong><p>${message.message}</p><span>🕗  ${date} </span>`;
  }
  li.classList.add(type);
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
}

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value.toHtmlEntities();
  if (message !== "") {
    socket.emit("message", message);
    writeMessage({ username: "me", message }, "me");
    messageInput.value = "";
    messageInput.focus();
  }
});

socket.on("message", writeMessage);

socket.on("broadcast", (broadcast) => {
  writeMessage(broadcast, "broadcast");
});

socket.on("users", (users) => {
  usersList.innerHTML = "";
  for (let i in users) {
    let li = document.createElement("li");
    li.innerHTML = "&#128571 " + users[i];
    usersList.appendChild(li);
  }
});
