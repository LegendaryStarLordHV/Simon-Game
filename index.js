const colors = ["green", "blue", "yellow", "red"];
let randomSequence = [];
let playerSequence = [];
let started = false;
let level = 0;

function generageRandomnumber() {
  return Math.floor(Math.random() * 4);
}

$(document).on("keypress", () => {
  if (!started) {
    $("h1").text("Level" + level);
    generateSequence();
    started = true;
  }
});

$(".btn").on("click", (e) => {
  let userChosenColour = e.target.id;
  playerSequence.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(playerSequence.length - 1);
});

function checkAnswer(currentLevel) {
  if (randomSequence[currentLevel] === playerSequence[currentLevel]) {
    if (randomSequence.length === playerSequence.length) {
      setTimeout(generateSequence, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function playSound(color) {
  let audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function generateSequence() {
  playerSequence = [];
  level++;
  $("h1").text("Level " + level);
  let randomColor = colors[generageRandomnumber()];
  let colorEl = $(`#${randomColor}`);
  randomSequence.push(randomColor);
  colorEl.fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  randomSequence = [];
  started = false;
}
