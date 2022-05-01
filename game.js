"use strict;";

const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userPattern = [];
const btnElements = document.querySelectorAll(".btn");
const titleEl = document.querySelector("h1");
const bodyEl = document.querySelector("body");

let level = 0;
let gameOn = false;

const playSound = function (soundName) {
  const audio = new Audio(`sounds/${soundName}.mp3`);
  audio.play();
};

const nextSequence = function () {
  const randomColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomColor);

  const btnEl = document.getElementById(randomColor);
  btnEl.classList.add("btn-click");
  btnEl.addEventListener("animationend", () =>
    btnEl.classList.remove("btn-click")
  );
  playSound(randomColor);

  level += 1;
  titleEl.textContent = `Level ${level}`;
};

const animatePress = function (color) {
  const colorEl = document.getElementById(color);
  colorEl.classList.add("pressed");
  window.setTimeout(function () {
    colorEl.classList.remove("pressed");
  }, 100);
};

const checkAnswer = function (currentLevel) {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    if (currentLevel === gamePattern.length - 1) {
      window.setTimeout(function () {
        nextSequence();
        userPattern.length = 0;
      }, 1000);
    }
  } else {
    bodyEl.classList.add("game-over");
    window.setTimeout(function () {
      bodyEl.classList.remove("game-over");
    }, 200);

    playSound("wrong");
    titleEl.textContent = "Game Over, Press Any Key to Restart";

    startOver();
  }
};

const startOver = function () {
  level = 0;
  gamePattern.length = 0;
  gameOn = false;
};

btnElements.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const clickedColor = btn.id;
    userPattern.push(clickedColor);
    playSound(clickedColor);
    animatePress(clickedColor);
    checkAnswer(userPattern.length - 1);
  });
});

document.addEventListener("keydown", function () {
  if (!gameOn) {
    nextSequence();
    gameOn = true;
  }
});
