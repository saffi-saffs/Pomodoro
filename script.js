const body = document.querySelector("body");

const pomodoroTab = document.getElementById("pomodoro");
const shortBreakTab = document.getElementById("shortBreak");
const longBreakTab = document.getElementById("longBreak");
const tablist = document.getElementById("task-list");

const taskheader = document.getElementById("myDIV");

const pomodoroContent = document.getElementById("pomodoro-content");
const shortBreakContent = document.getElementById("shortbreak-content");
const longBreakContent = document.getElementById("longbreak-content");

const pomodoroTime = document.getElementById("pomodoroTime");
const shortBreakTime = document.getElementById("shortBreakTime");
const longBreakTime = document.getElementById("longBreakTime");

const pomodoroButton = document.getElementById("pomodoroButton");
const shortBreakButton = document.getElementById("shortBreakButton");
const longBreakButton = document.getElementById("longBreakButton");

const tabs = [shortBreakTab, longBreakTab, pomodoroTab];
const contents = [pomodoroContent, shortBreakContent, longBreakContent];

function addActiveClass(tabElement, contentElement) {
  tabElement.addEventListener("click", function () {
    tabElement.classList.add("active");
    tabs
      .filter((tab) => tab !== tabElement)
      .forEach((tab) => tab.classList.remove("active"));
    contentElement.classList.add("active");
    contents
      .filter((content) => content !== contentElement)
      .forEach((content) => content.classList.remove("active"));

    if (tabElement === pomodoroTab) {
      body.style.backgroundColor = " #913ba5";
      pomodoroButton.style.color = " #913ba5";
      tablist.style.backgroundcolor = " #913ba5";
      taskheader.style.backgroundcolor = " #913ba5";
    } else if (tabElement === shortBreakTab) {
      body.style.backgroundColor = "#008080";
      shortBreakButton.style.backgroundcolor = "#4c9195";
      tablist.style.color = "#4c9195";
      taskheader.style.backgroundcolor = " #913ba5";
    } else if (tabElement === longBreakTab) {
      body.style.backgroundColor = "#457ca3";
      longBreakButton.style.color = "#457ca3";
      tablist.style.backgroundColor = "#457ca3";
      taskheader.style.backgroundcolor = " #913ba5";
    }
  });
}

addActiveClass(pomodoroTab, pomodoroContent);
addActiveClass(shortBreakTab, shortBreakContent);
addActiveClass(longBreakTab, longBreakContent);

function convertToTwoDigits(num) {
  return num.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

let timerInterval;

function timer(seconds, element, button) {
  const now = Date.now();
  const then = now + seconds * 1000;

  timerInterval = setInterval(function () {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    displayTime(secondsLeft, element);

    if (secondsLeft < 1) {
      clearInterval(timerInterval);
      element.innerHTML = `${convertToTwoDigits(seconds / 60)} : 00`;
      button.innerText = "START";
    }
  }, 1000);
}

function displayTime(seconds, element) {
  const minute = Math.floor(seconds / 60);
  const second = seconds % 60;

  //console.log({ minute, second });
  element.innerText =
    convertToTwoDigits(minute) + " : " + convertToTwoDigits(second);
}

function startStop(button, timeText, totalTime) {
  button.addEventListener("click", function () {
    if (button.innerText === "START") {
      timer(totalTime, timeText, button);
      button.innerText = "STOP";
    } else {
      clearInterval(timerInterval);
      timeText.innerHTML = `${convertToTwoDigits(totalTime / 60)} : 00`;
      button.innerText = "START";
    }
  });
}

startStop(pomodoroButton, pomodoroTime, 1500);
startStop(shortBreakButton, shortBreakTime, 300);
startStop(longBreakButton, longBreakTime, 900);

var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  };
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector("ul");
list.addEventListener(
  "click",
  function (ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}
