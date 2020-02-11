namespace Game {

  import fudge = FudgeCore;

  window.onload = addEventlisteners;

  function addEventlisteners(): void {
    let newGame: HTMLElement = document.getElementById("newGame");
    let loadGame: HTMLElement = document.getElementById("loadGame");

    newGame.addEventListener("click", start);
    loadGame.addEventListener("click", load);

    function start(): void {
      window.open("game.html");
    }

    function load(): void {
    }
  }
}