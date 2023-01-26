const recordForm = document.querySelector("#recordForm");
const recordArea = document.querySelector("#recordArea");
const recordSource = document.querySelector("#recordSource");

let recordArr = [];

function saveRecord(e) {
  e.preventDefault();

  const date = new Date();
  const id = Date.now();

  if (recordArea.value !== "") {
    const recordObj = {
      text: recordArea.value,
      source: recordSource.value,
      date: date,
      id: id,
    };

    recordArr.push(recordObj);
    setRecord();
    recordArea.value = "";
    recordSource.value = "";
    seeRecord(recordObj);
  }
}

// 같은 게 두 번 쓰여서 function으로 뺐다.
function setRecord() {
  localStorage.setItem("record", JSON.stringify(recordArr));
}

// 복수 node 추가
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
  });

  const modBtn = document.querySelector(".mod");
  const delBtn = document.querySelector(".del");

  modBtn.addEventListener("click", modRecord);
  delBtn.addEventListener("click", delRecord);
}

// 수정
function modRecord(e) {
  const id = e.target.parentElement.id;
  console.log(id);

  const answer = recordArr.filter((item) => item.id === Number(id));
  recordArea.value = answer[0].text;
  recordSource.value = answer[0].source;

  const btn = document.querySelector("#recordBtn");
}

// 삭제
function delRecord(e) {
  const li = e.target.parentElement;
  li.remove();
  recordArr = recordArr.filter((item) => item.id !== Number(li.id));
  setRecord();
}

recordForm.addEventListener("submit", saveRecord);
const getRecord = JSON.parse(localStorage.getItem("record"));

if (getRecord !== null) {
  recordArr = getRecord;
  getRecord.forEach(seeRecord);
}
