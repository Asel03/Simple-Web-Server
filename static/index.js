let countdown = 0; 
let seconds = 1500; 
let workTime = 25;
let breakTime = 5;
let isBreak = true;
let isPaused = true;

const circleContent = document.querySelector("#circle-content");
const timerDisplay = document.querySelector(".timerDisplay");
const start = document.querySelector("#start");
const resetBtn = document.querySelector("#reset");
const workMin = document.querySelector("#work-min");
const breakMin = document.querySelector("#break-min");

const alarm = document.createElement('audio');
alarm.setAttribute("src", "samsung_galaxy_chime_time.mp3");

start.addEventListener('click', () => {
    clearInterval(countdown);
    isPaused = !isPaused;
    if (!isPaused) {
      countdown = setInterval(timer, 1000);
    }
  })
  
  resetBtn.addEventListener('click', () => {
    clearInterval(countdown);
    seconds = workTime * 60;
    countdown = 0;
    isPaused = true;
    isBreak = true;
  })
  
  function timer() {
    seconds--;
    if (seconds < 0) {
      clearInterval(countdown);
      alarm.currentTime = 0;
      alarm.play();
      seconds = (isBreak ? breakTime : workTime) * 60;
      isBreak = !isBreak;
    }
  }
  
  
  let increment = 5;
  
  let incrementFunctions =
    {
      "#work-plus": function () { workTime = Math.min(workTime + increment, 60) },
      "#work-minus": function () { workTime = Math.max(workTime - increment, 5) },
      "#break-plus": function () { breakTime = Math.min(breakTime + increment, 60) },
      "#break-minus": function () { breakTime = Math.max(breakTime - increment, 5) }
    };
  
  for (var key in incrementFunctions) {
    if (incrementFunctions.hasOwnProperty(key)) {
      document.querySelector(key).onclick = incrementFunctions[key];
    }
  }
  
  function countdownDisplay() {
    let minutes = Math.floor(seconds / 60);
    let remainderSeconds = seconds % 60;
    timerDisplay.textContent = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  }
  
  function buttonDisplay() {
    if (isPaused && countdown === 0) {
      start.textContent = "START";
    } else if (isPaused && countdown !== 0) {
      start.textContent = "Continue";
    } else {
      start.textContent = "Pause";
    }
  }
  
  function updateHTML() {
    countdownDisplay();
    buttonDisplay();
    isBreak ? circleContent.textContent = "Keep Working" : circleContent.textContent = "Take a Break!";
    workMin.textContent = workTime;
    breakMin.textContent = breakTime;
  }
  
  window.setInterval(updateHTML, 100);
  
  document.onclick = updateHTML;