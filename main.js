var minutesInput = document.querySelector("#inputMinutes");
var secondsInput = document.querySelector("#inputSeconds");
var spanMinutes = document.querySelector("#minutes");
var spanSeconds = document.querySelector("#seconds");
var btnStart = document.querySelector("#btnStart");
var btnStop = document.querySelector("#btnStop");
var intervalID;
var timeOutImg = document.querySelector("#timeOutImg");
var countdownContainer = document.querySelector("#countdown-container");
var circle = document.querySelector("circle");
var loader = document.querySelector(".loader");

secondsInput.oninput = validTime;
minutesInput.oninput = validTime;

function validTime() {
  if (minutesInput.value > 59 || minutesInput.value < 0 || secondsInput.value > 59 || secondsInput.value < 0) {
    if (minutesInput.value > 59 || minutesInput.value < 0)
      document.querySelector("#invalidMinutes").style.display = "block";
    else document.querySelector("#invalidMinutes").style.display = "none";
    if (secondsInput.value > 59 || secondsInput.value < 0)
      document.querySelector("#invalidSeconds").style.display = "block";
    else document.querySelector("#invalidSeconds").style.display = "none";
    btnStart.disabled = true;
    btnStart.style.cursor = "default";
  } else {
    this.id === "inputSeconds"
      ? (document.querySelector("#invalidSeconds").style.display = "none")
      : (document.querySelector("#invalidMinutes").style.display = "none");
    btnStart.disabled = false;
    btnStart.style.cursor = "pointer";
  }
}

async function fetchRandomImg() {
  //get the url and show the image
  var res = await fetch("https://picsum.photos/400");
  var url = res.url; //await res.json();
  timeOutImg.src = url;
  timeOutImg.onload = function () {
    timeOutImg.style.display = "block";
    loader.style.display = "none";
  };
}

var initialOffset = "502"; // 2*pi*r = the pixel circumference of the circle
var init = "0"; //full circumference
var time;

btnStart.onclick = function () {
  var secondsValue = +document.querySelector("#inputSeconds").value;
  var minutesValue = +document.querySelector("#inputMinutes").value;
  time = minutesValue * 60 + secondsValue; //total time of minutes and seconds used to animate the circumference of the circle
  var i = 1;

  // I allow the user to leave one of the fields blank (minutes or seconds) and just start them from 0
  if (minutesValue !== 0 || secondsValue !== 0) {
    minutesInput.disabled = true; //blocks the input field
    secondsInput.disabled = true; //blocks the input field
    spanMinutes.innerText = minutesValue === 0 ? "00" : minutesValue < 10 ? "0" + minutesValue : minutesValue; //sets the minutes in the timer
    spanSeconds.innerText = secondsValue === 0 ? "00" : secondsValue < 10 ? "0" + secondsValue : secondsValue; //sets the seconds in the timer
    circle.style.strokeDashoffset = init - 1 * (initialOffset / time); //sets the circumference of the circle

    intervalID = setInterval(function () {
      if (secondsValue === 0 && minutesValue === 0) {
        //if the timer ends
        fetchRandomImg();
        clearInterval(intervalID);
      } else if (secondsValue === 0 && minutesValue >= 1) {
        //when the seconds=0 we need to set the seconds to 59
        minutesValue--;
        secondsValue = 59;
        spanMinutes.innerText = minutesValue < 10 ? "0" + minutesValue : minutesValue; //sets the minutes in the timer
        spanSeconds.innerText = secondsValue; //sets the seconds in the timer
        circle.style.strokeDashoffset = init - (i + 1) * (initialOffset / time); //sets the circumference of the circle
        i++;
      } else {
        spanMinutes.innerText = minutesValue < 10 ? "0" + minutesValue : minutesValue;
        spanSeconds.innerText = secondsValue <= 10 ? "0" + --secondsValue : --secondsValue;
        if (secondsValue === 0 && minutesValue === 0) {
          //if the timer ends set the circumference of the circle to be full
          //circle.style.strokeDashoffset = init;
          countdownContainer.style.display = "none";
          loader.style.display = "block";
        } else {
          circle.style.strokeDashoffset = init - (i + 1) * (initialOffset / time); //sets the circumference of the circle
          i++;
        }
      }
    }, 1000);
  }
};

btnStop.onclick = function () {
  clearInterval(intervalID);
  minutesInput.disabled = false;
  secondsInput.disabled = false;
  spanMinutes.innerText = "00";
  spanSeconds.innerText = "00";
  circle.style.strokeDashoffset = init;
};
