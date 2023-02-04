const recordForm = document.querySelector("#recordForm");
const recordArea = document.querySelector("#recordArea");
const recordSource = document.querySelector("#recordSource");
const hiddenId = document.querySelector("#recordId");
const msg = document.querySelector(".emptyMsg");

const recordBtn = document.querySelector("#recordBtn");
const modBtn = document.querySelector("#modBtn");

let recordArr = [];

// 로컬스토리지가 비어있지 않다면! 바로 출력한다.
const getRecord = JSON.parse(localStorage.getItem("record"));
if (getRecord !== null) {
  seeMsg();
  recordArr = getRecord;
  recordArr.forEach(seeRecord);
}

function seeMsg() {
  if (getRecord.length === 0) {
    msg.classList.remove("hidden");
  } else {
    msg.classList.add("hidden");
  }
}

// 저장
function saveRecord(e) {
  e.preventDefault();

  const date = new Date();
  const recordObj = {
    text: recordArea.value,
    source: recordSource.value,
    date: `${date.getFullYear()}년${
      date.getMonth() + 1
    }월${date.getDate()}일 ${date.getHours()}:${date.getMinutes()}`,
    id: Date.now(),
  };

  recordArr.push(recordObj);
  setRecord();

  recordArea.value = "";
  recordSource.value = "";
  seeRecord(recordObj);
}

// 같은 게 두 번 쓰여서 function으로 뺐다.
function setRecord() {
  localStorage.setItem("record", JSON.stringify(recordArr));
  seeMsg();
}

// 보기
function seeRecord(recordValue) {
  const li = document.createElement("li");
  const recordList = document.querySelector("#recordList");
  const newLi = recordList.appendChild(li);
  newLi.id = recordValue.id;

  const p = document.createElement("p");
  const text = newLi.appendChild(p);
  text.innerText = recordValue.text;

  [recordValue.source, recordValue.date].forEach((text) => {
    const span = document.createElement("span");
    const textNode = document.createTextNode(text);
    span.appendChild(textNode);
    newLi.appendChild(span);
  });

  ["mod", "del"].forEach((text) => {
    const button = document.createElement("button");
    const textNode = document.createTextNode(text);
    button.appendChild(textNode);
    newLi.appendChild(button);
    button.classList.add(text);

    button.addEventListener("click", (e) => {
      button.className === "mod" ? modRecord(e) : delRecord(e);
    });
  });
}

// 수정
function modRecord(e) {
  // 기록 버튼 사라지고 수정 버튼 보이기 (input type button)
  const id = e.target.parentElement.id;

  recordBtn.classList.add("hidden");
  modBtn.classList.remove("hidden");

  // 수정할 내용 textarea, input창에 보이기
  const answer = recordArr.filter((item) => item.id === Number(id));
  recordArea.value = answer[0].text;
  recordSource.value = answer[0].source;
  hiddenId.innerText = answer[0].id;

  // 기록 버튼을 누르면 수정한다.
  // 객체로 접근 > 변경 > 다시 출력
  modBtn.addEventListener("click", modText);
}

// 텍스트 수정 > 로컬스토리지 수정
function modText(e) {
  //e.preventDefault();
  // 원본 불러오기
  // 텍스트 수정
  const id = hiddenId.innerText;
  recordArr.forEach((item) => {
    if (item.id === Number(id)) {
      item.text = recordArea.value;
      item.source = recordSource.value;
      item.date = item.date;
      item.id = item.id;
    }
  });

  setRecord();

  const li = document.getElementById(`${id}`);
  const p = li.firstElementChild;
  p.innerText = recordArea.value;
  const span = p.nextSibling;
  span.innerText = recordSource.value;

  recordArea.value = "";
  recordSource.value = "";

  recordBtn.classList.remove("hidden");
  modBtn.classList.add("hidden");
}

// 삭제
function delRecord(e) {
  const li = e.target.parentElement;
  li.remove();
  recordArr = recordArr.filter((item) => item.id !== Number(li.id));
  setRecord();
}

recordForm.addEventListener("submit", saveRecord);
