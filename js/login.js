const loginForm = document.querySelector("#loginForm");

// 로그인
// 성공 > 로그인폼 사라짐, 회원 닉네임 환영인사~
// 실패 > 1. 아이디 없을 경우 / 2. 비밀번호 재확인
function login(e) {
  e.preventDefault();

  const id = document.querySelector("#idInput");
  const pw = document.querySelector("#pwInput");
  const users = JSON.parse(localStorage.getItem("user"));

  if (users.id === id.value && users.pw === pw.value) {
    const h2 = document.querySelector("#greetingSpan");
    const loginBox = document.querySelector("#loginBox");
    const record = document.querySelector("#record");
    const header = document.querySelector("header");

    loginBox.classList.remove("loginBox", "columnFlex");
    loginBox.classList.add("hidden");
    h2.innerText = `${users.name}님 반가워요!`;

    record.classList.remove("hidden");
    header.classList.remove("hidden");
  } else {
    const answer =
      users.id !== id.value ? "아이디가 없습니다" : "비밀번호를 확인하세요";
    alert(answer);
  }
}

loginForm.addEventListener("submit", login);
