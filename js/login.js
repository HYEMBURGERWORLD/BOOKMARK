const loginForm = document.querySelector("#loginForm");
const user = JSON.parse(localStorage.getItem("user"));

function login(e) {
  const id = document.querySelector("#idInput");
  const pw = document.querySelector("#pwInput");
  e.preventDefault();

  if (user.id === id.value && user.pw === pw.value) {
    console.log("로그인성공~");
  } else if (user.id !== id.value || user.pw !== pw.value) {
    const answer =
      user.id !== id.value ? "아이디가 없습니다" : "비밀번호를 확인하세요";
    alert(answer);
  }
}

loginForm.addEventListener("submit", login);
