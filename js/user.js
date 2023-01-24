const userForm = document.querySelector("#userForm");
const userId = document.querySelector("#userId");
const userPw = document.querySelector("#userPw");
const userPwCheck = document.querySelector("#userPwCheck");

const user = JSON.parse(localStorage.getItem("user"));
const PASSID_KEY = "사용하실 수 있습니다.";
const PASSPW_KEY = "비밀번호 확인 완료!";

function checkId() {
  const checkIdSpan = document.querySelector("#checkId");
  const reg = /[^\w]+/g;

  if (user.id === userId.value) {
    checkIdSpan.innerText = "중복된 아이디입니다.";
  } else if (userId.value.match(reg)) {
    checkIdSpan.innerText = "한글 / 영어 / 숫자 / _만 사용 가능합니다";
  } else {
    checkIdSpan.innerText = PASSID_KEY;
    return PASSID_KEY;
  }
}

function checkPw() {
  const checkPwSpan = document.querySelector("#checkPw");
  if (userPwCheck.value !== userPw.value) {
    checkPwSpan.innerText = "비밀번호가 같지 않습니다.";
  } else {
    checkPwSpan.innerText = PASSPW_KEY;
    return PASSPW_KEY;
  }
}

function saveUserInfo(e) {
  e.preventDefault();

  const idCheck = checkId();
  const pwCheck = checkPw();

  if (idCheck === PASSID_KEY && pwCheck === PASSPW_KEY) {
    const userName = document.querySelector("#userName");
    const userBirth = document.querySelector("#userBirth");

    const userObj = {
      id: userId.value,
      pw: userPw.value,
      name: userName.value,
      birth: userBirth.value,
    };

    localStorage.setItem("user", JSON.stringify(userObj));
    location.assign("index.html");
  } else {
    alert("아이디나 비밀번호를 확인하세요.");
  }
}

userForm.addEventListener("submit", saveUserInfo);
userId.addEventListener("keyup", checkId);
userPwCheck.addEventListener("keyup", checkPw);
