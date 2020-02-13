namespace Game {

  import fudge = FudgeCore;

  window.onload = addEventlisteners;

  let select: HTMLAudioElement;
  let theme: HTMLAudioElement;

  function addEventlisteners(): void {

    fetchAudios();
    playThemeSound();

    let newGame: HTMLElement = document.getElementById("newGame");
    let loadGame: HTMLElement = document.getElementById("loadGame");

    newGame.addEventListener("click", start);
    //loadGame.addEventListener("click", load);
  }


  function start(): void {
    select.play();
    window.open("game.html");
  }


  function fetchAudios(): void {

    select = new Audio();
    select.src = "../Game/Assets/select.wav";
    select.load();

    theme = new Audio();
    theme.src = "../Game/Assets/theme.wav";
    theme.load();


    Util.getInstance().selectSound = select;
    Util.getInstance().pickUpSound = theme;
  }

  function playThemeSound(): void  {
    theme.play();
  }

}