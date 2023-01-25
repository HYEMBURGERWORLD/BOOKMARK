const recordForm = document.querySelector("#recordForm");

let textArr = [];

function saveRecord(e) {
  e.preventDefault();

  const recordTxt = document.querySelector("#recordArea");
  const recordSource = document.querySelector("#recordSource");

  const date = new Date();
  const recordDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  if (recordTxt.value !== "") {
    const recordObj = {
      text: recordTxt.value,
      source: recordSource.value,
      date: recordDate,
    };

    textArr.push(recordObj);
    localStorage.setItem("record", JSON.stringify(textArr));
    seeRecord(recordObj);
  }
}

function seeRecord(recordValue) {
  console.log(recordValue.text);
  console.log(recordValue.source);
  console.log(recordValue.date);
}

recordForm.addEventListener("submit", saveRecord);
