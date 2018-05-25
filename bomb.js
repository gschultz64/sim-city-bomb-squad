console.log("javascript running");

var startingTime = 30;
var remainingTime = 0;
var gameOver = false;
var wiresToCut = [];

var delay = null;
var timer = null;

var wiresCut = {
  blue: false,
  green: false,
  red: false,
  white: false,
  yellow: false
}

var checkForWin = function() {
  return wiresToCut.length > 0 ? false : true;
}

var endGame = function(win) {
  clearTimeout(delay);
  clearInterval(timer);
  gameOver = true;
  // activate reset button
  if (win) {
    // we won!!!
    console.log("You saved the city!");
    document.getElementsByClassName("timerbox")[0].classList.add("green");
    document.getElementsByClassName("timerbox")[0].classList.remove("red");
  } else {
    // we lost :(
    console.log("BOOM!");
    document.body.classList.remove("unexploded");
    document.body.classList.add("exploded");
  }
}

var cutWire = function() {
  if (!wiresCut[this.id] && !gameOver) {
    // Do the wire cutting and game checking here
    this.src = "img/cut-" + this.id + "-wire.png";
    wiresCut[this.id] = true;
    // Check for correct wire
    var wireIndex = wiresToCut.indexOf(this.id);
    if (wireIndex > -1) {
      // This is where the good cut logic goes
      console.log(this.id + " was correct!");
      wiresToCut.splice(wireIndex, 1);
      if (checkForWin()) {
        endGame(true);
      }
    } else {
      // this is where the bad cut logic goes
      console.log(this.id + " was incorrect!");
      delay = setTimeout(function() {
        endGame(false);
      }, 750);
    }
  } 
}

var updateClock = function() {
  remainingTime--;
  if (remainingTime <= 0) {
    endGame(false);
  }
  document.querySelector(".timerbox p").textContent = "0.00:" + remainingTime;
}

var initGame = function() {
  remainingTime = startingTime;
  for (let wire in wiresCut) {
    var rand = Math.random();
    if (rand > 0.5) {
      wiresToCut.push(wire);
    }
  }
  console.log(wiresToCut);
  timer = setInterval(updateClock, 1000);
}

document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM loaded");
  for (let wire in wiresCut) {
    document.getElementById(wire).addEventListener("click", cutWire);
  }
  initGame();
});



//On load -
//  Start timer
//  Class unexploded
//  Display uncut wire images
//  Color of timer "red"
//  Deactivate reset button
//  Play siren sound
//  Randomly assign correct wires

//On Win -
//  Timer stops
//  Color of timer "green"
//  Play "yay" sound
//  Play victory song
//  Enable reset button

//On bad wire cut -
//  Start 750ms timeout
//  Change class to exploded
//  Enable reset button
//  Play "boom" sound
//  Timer stops
//  On timeout, do previous 4 steps

//On any wire cut -
//  Swap image
//  Disable click
//  Is this correct or wrong wire?
//    Correct: final wire? if so, win.
//    Wrong: start timeout

//Keep track of wires that have been cut
//Need to know which wires need to be cut
//Wires in array, remove from array when cut("clicked")
