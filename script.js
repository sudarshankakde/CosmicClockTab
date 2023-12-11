let stars = document.querySelectorAll(".star");
const currentDate = new Date();
let hours = currentDate.getHours() % 12 || 12;
let minutes = currentDate.getMinutes();
let second = currentDate.getSeconds();
// nubric clock time
let currentHour = document.getElementById("currentHour");
let currentMinute = document.getElementById("currentMinute");
// html elements
let hourHand = document.getElementById("hour");
let minuteHand = document.getElementById("minute");
let secondHand = document.getElementById("second");

let currentHourDeg = 0;
let currentMinuteDeg = 0;
let currentSecDeg = 0;

// theme related var
let themeSelected = localStorage.getItem("themeSelected");
let timeformat = localStorage.getItem("timeFormat");

window.addEventListener("load", () => {
  // set time on sun
  currentHour.innerHTML = hours;
  currentMinute.innerHTML = minutes;

  // setting degree of each planet
  currentHourDeg = hours * 30;
  currentMinuteDeg = minutes * 6;
  currentSecDeg = second * 6;

  //setting degree in html
  hourHand.style.transform = `rotate(${currentHourDeg}deg)`;
  minuteHand.style.transform = `rotate(${currentMinuteDeg}deg)`;
  secondHand.style.transform = `rotate(${currentSecDeg}deg)`;

  if (themeSelected != null) {
    document.body.removeAttribute("class");
    document.body.classList.add(themeSelected);
  }
});
stars.forEach((element) => {
  let x = Math.floor(Math.random() * 100 + 1);
  let y = Math.floor(Math.random() * 100 + 1);
  let size = Math.floor(Math.random() * 10 + 3);
  let animation_duration = Math.floor(Math.random() * 100 + 5);
  element.style.left = x + "vw";
  element.style.bottom = y + "vh";
  element.style.height = size + "px";
  element.style.width = size + "px";
  element.style.animationDuration = animation_duration + "s";
});

function rotateHourHand() {
  if (hours < 60) {
    hours += 1;
    currentHour.innerHTML = hours;
  } else if (minutes == 60) {
    hours = 0;
    currentHour.innerHTML = hours;
  }
  if (currentHourDeg < 360) {
    // currentSecDeg += 6;
    currentHourDeg += 30;
    hourHand.style.transform = `rotate(${currentHourDeg}deg)`;
  } else if (currentHourDeg == 360) {
    currentHourDeg = 0;
    currentHour.innerHTML = hours;
    currentHour.style.transform = `rotate(0deg)`;
  }
}

function rotateMinuteHand() {
  if (minutes < 60) {
    minutes += 1;
    currentMinute.innerHTML = minutes;
  } else if (minutes == 60) {
    minutes = 0;
    currentMinute.innerHTML = minutes;
    rotateHourHand();
  }
  if (currentMinuteDeg < 360) {
    currentMinuteDeg += 6;
    minuteHand.style.transform = `rotate(${currentMinuteDeg}deg)`;
  } else if (currentMinuteDeg == 360) {
    currentMinuteDeg = 0;
    currentMinute.innerHTML = minutes;
    minuteHand.style.transform = `rotate(0deg)`;
  }
}
setInterval(() => {
  if (currentSecDeg < 360) {
    currentSecDeg += 6;
    secondHand.style.transform = `rotate(${currentSecDeg}deg)`;
  } else if (currentSecDeg == 360) {
    currentSecDeg = 0;
    rotateMinuteHand();

    secondHand.style.transform = `rotate(0deg)`;
  }
}, 1000);

document.getElementById("settingIcon").addEventListener("click", function () {
  var event = this.getAttribute("data-event");
  if (event == "closed") {
    document.getElementById("settingBar").style.display = "block";
    this.setAttribute("data-event", "opened");
  } else if (event == "opened") {
    document.getElementById("settingBar").style.display = "none";
    this.setAttribute("data-event", "closed");
  }
});

document.addEventListener("click", function (event) {
  // If user clicks inside the element, do nothing
  if (event.target.closest("#items")||event.target.closest('#settingIcon')) {
    //debugger;
    return;
  } else {
    document.getElementById("settingBar").style.display = "none";
    document.getElementById("settingIcon").setAttribute("data-event", "closed");
    
  }

  // If user clicks outside the element, hide it!
  //settings.classList.add("hide");
  //document.querySelector(".closed").classList.remove("hide");
  //document.querySelector(".closed").classList.add("block");
});

var elements = document.getElementsByClassName("settingItem");

var setTheme = function () {
  var attribute = this.getAttribute("data-theme");
  document.body.removeAttribute("class");
  document.body.classList.add(attribute);
  localStorage.setItem("themeSelected", attribute);
};

for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", setTheme, false);
}
