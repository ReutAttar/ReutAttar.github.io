var minutesInput = document.querySelector("#inputMinutes");
var secondsInput = document.querySelector("#inputSeconds");
var spanMinutes = document.querySelector("#minutes");
var spanSeconds = document.querySelector("#seconds");
var btnStart = document.querySelector("#btnStart");
var btnStop = document.querySelector("#btnStop");
var btnPause = document.querySelector("#btnPause");
var intervalID;
var timeOutImg = document.querySelector("#timeOutImg");
var countdownContainer = document.querySelector("#countdown-container");
var circle = document.querySelector("circle");
var loader = document.querySelector(".loader");

secondsInput.oninput = validTime;
minutesInput.oninput = validTime;

//validation fanction for input fields
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
var isPause = false;
var secondsValue;
var minutesValue;

function setTimer() {
  if (isPause) {
    /* after clicking "pause" we define the seconds & minutes from "spans" that have the seconds and minutes when the user clicked pause, 
    in order to start the countdown from this time.*/
    secondsValue = +spanSeconds.innerText;
    minutesValue = +spanMinutes.innerText;
  } else {
    //the first time the user clicked "start" we define the seconds & minutes from input fields
    secondsValue = +document.querySelector("#inputSeconds").value;
    minutesValue = +document.querySelector("#inputMinutes").value;
  }
}

var initialOffset = 502; // 2*pi*r = the pixel circumference of the circle
var init = 0; //full circumference
var time;
var i;

btnStart.onclick = function () {
  setTimer();
  if (!isPause) {
    //happens only once, for the first time the user clicks 'start'
    time = minutesValue * 60 + secondsValue; //total time of minutes and seconds used to animate the circumference of the circle
    i = 1; //the next time the user click start (after pause) the 'i' value will start from the same value when the user clicked pause, and not from 1
    circle.style.strokeDashoffset = init - 1 * (initialOffset / time); //sets the circumference of the circle
  }

  // I allow the user to leave one of the fields blank (minutes or seconds) and just start them from 0
  if (minutesValue !== 0 || secondsValue !== 0) {
    minutesInput.disabled = true; //blocks the input field
    secondsInput.disabled = true; //blocks the input field
    spanMinutes.innerText = minutesValue === 0 ? "00" : minutesValue < 10 ? "0" + minutesValue : minutesValue; //sets the minutes in the timer
    spanSeconds.innerText = secondsValue === 0 ? "00" : secondsValue < 10 ? "0" + secondsValue : secondsValue; //sets the seconds in the timer

    intervalID = setInterval(function () {
      if (secondsValue === 0 && minutesValue === 0) {
        //if the timer ends
        clearInterval(intervalID);
        countdownContainer.style.display = "none";
        loader.style.display = "block";
        fetchRandomImg();
      } else if (secondsValue === 0 && minutesValue >= 1) {
        //when the seconds=0 (and still there are minutes) we need to set the seconds to 59
        minutesValue--;
        secondsValue = 59;
        spanMinutes.innerText = minutesValue < 10 ? "0" + minutesValue : minutesValue; //sets the minutes in the timer
        spanSeconds.innerText = secondsValue; //sets the seconds in the timer
        circle.style.strokeDashoffset = init - (i + 1) * (initialOffset / time); //sets the circumference of the circle
        i++;
      } else {
        spanMinutes.innerText = minutesValue < 10 ? "0" + minutesValue : minutesValue;
        spanSeconds.innerText = secondsValue <= 10 ? "0" + --secondsValue : --secondsValue;
        console.log(time);
        console.log(i);
        if (secondsValue !== 0 || minutesValue !== 0) {
          //when seconds=0 and minutes=0 if=false, Because we do not want to promote "i", because we have reached a point where the circumference of the circle is over and "i" can affect it
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
  isPause = false;
};

btnPause.onclick = function () {
  clearInterval(intervalID);
  isPause = true;
};
