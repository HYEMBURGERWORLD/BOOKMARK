const userForm = document.querySelector("#userForm");
const userId = document.querySelector("#userId");

const userPw = document.querySelector("#userPw");
const userPwCheck = document.querySelector("#userPwCheck");
const checkPwSpan = document.querySelector("#checkPw");

const month = document.querySelector("#userBirthMonth");
const day = document.querySelector("#userBirthDay");

const user = JSON.parse(localStorage.getItem("user"));
const PASSID_KEY = "사용하실 수 있습니다.";
const PASSPW_KEY = "비밀번호 확인 완료!";

for (let i = 1; i <= 12; i++) {
  let m = document.createElement("option");

  if (i < 10) {
    m.innerText = "0" + i;
    m.value = "0" + i;
  } else {
    m.innerText = i;
    m.value = i;
  }
  month.appendChild(m);
}

for (let j = 1; j <= 31; j++) {
  let d = document.createElement("option");
  if (j < 10) {
    d.innerText = "0" + j;
    d.value = "0" + j;
  } else {
    d.innerText = j;
    d.value = j;
  }
  day.appendChild(d);
}

// id 중복체크
function checkId() {
  const checkIdSpan = document.querySelector("#checkId");
  const reg = /[^\w]+/g;

  if (user.id === userId.value) {
    checkIdSpan.innerText = "중복된 아이디입니다.";
  } else if (userId.value.match(reg)) {
    checkIdSpan.innerText = "영어 / 숫자 / _만 사용 가능합니다";
  } else if (userId.value.length < 4) {
    checkIdSpan.innerText = "4자 이상이어야 합니다.";
  } else {
    checkIdSpan.innerText = PASSID_KEY;
    return PASSID_KEY;
  }
}

// 비밀번호 재확인
function checkPw() {
  if (userPwCheck.value !== userPw.value) {
    checkPwSpan.innerText = "비밀번호가 같지 않습니다.";
  } else {
    checkPwSpan.innerText = PASSPW_KEY;
    return PASSPW_KEY;
  }
}

// 비밀번호 수정 시 비밀번호 확인 input 초기화
function resetPw() {
  userPwCheck.value = "";
  checkPwSpan.innerText = "";
}

// 회원정보 local storage에 저장
function saveUserInfo(e) {
  e.preventDefault();

  if (checkId() === PASSID_KEY && checkPw() === PASSPW_KEY) {
    const userName = document.querySelector("#userName");

    const userObj = {
      id: userId.value,
      pw: userPw.value,
      name: userName.value,
      birth: month.value + day.value,
    };

    localStorage.setItem("user", JSON.stringify(userObj));
    alert("회원가입이 완료되었습니다!");
    location.assign("index.html");
  } else {
    alert("아이디 혹은 비밀번호를 확인하세요.");
  }
}

userForm.addEventListener("submit", saveUserInfo);
userId.addEventListener("keyup", checkId);
userPwCheck.addEventListener("keyup", checkPw);
userPw.addEventListener("keydown", resetPw);
