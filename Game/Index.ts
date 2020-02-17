import fudge = FudgeCore;

window.onload = addEventlisteners;

function addEventlisteners(): void {

  let play: HTMLElement = document.getElementById("play");

  play.addEventListener("click", loadGame);
}

function loadGame(): void {
  window.open("startScreen", "_self", "fullscreen=yes", true);
}