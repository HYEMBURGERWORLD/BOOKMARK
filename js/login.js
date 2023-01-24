const loginForm = document.querySelector("#loginForm");
const users = JSON.parse(localStorage.getItem("user"));

function login(e) {
  const id = document.querySelector("#idInput");
  const pw = document.querySelector("#pwInput");
  const loginBox = document.querySelector("#loginBox");
  const span = document.querySelector("#greetingSpan");
  const main = document.querySelector("main");
  e.preventDefault();

  if (users.id === id.value && users.pw === pw.value) {
    loginBox.classList.add("hidden");
    //main.classList.remove("hidden");
    span.innerText = `${users.name}님 반가워요!`;
  } else if (users.id !== id.value || users.pw !== pw.value) {
    const answer =
      users.id !== id.value ? "아이디가 없습니다" : "비밀번호를 확인하세요";
    alert(answer);
  }
}

loginForm.addEventListener("submit", login);
