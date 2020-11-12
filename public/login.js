const login = document.querySelector("#login");
const chat = document.querySelector("#chat");
const loginForm = document.querySelector("#login-form");
const userName = document.querySelector("#username");

String.prototype.toHtmlEntities = function () {
  return this.replace(/./gm, function (s) {
    return s.match(/[a-z0-9\s]+/i) ? s : "&#" + s.charCodeAt(0) + ";";
  });
};

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = userName.value.toHtmlEntities();
  if (username !== "") {
    socket.emit("username", username);
    login.style.display = "none";
    chat.style.display = "block";
  }
});
