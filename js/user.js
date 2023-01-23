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
    checkIdSpan.innerText = "_를 제외한 특수문자는 사용할 수 없습니다.";
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

function saveUserInfo() {
  const idCheck = checkId();
  const pwCheck = checkPw();
  const userObj = {};

  if (idCheck === PASSID_KEY && pwCheck === PASSPW_KEY) {
    const userName = document.querySelector("#userName");
    const userBirth = document.querySelector("#userBirth");

    userObj.id = userId.value;
    userObj.pw = userPw.value;
    userObj.name = userName.value;
    userObj.userBirth = userBirth.value;
    localStorage.setItem("user", JSON.stringify(userObj));
    alert("회원가입이 완료되었습니다!");
    window.location.assign("index.html");
  } else {
    alert("아이디나 비밀번호를 확인하세요.");
  }
}

userForm.addEventListener("submit", saveUserInfo);
userId.addEventListener("keyup", checkId);
userPwCheck.addEventListener("keyup", checkPw);
