namespace Game {

  import fudge = FudgeCore;

  window.onload = addEventlisteners;

  function addEventlisteners(): void {
    fetchAudios();
    let newGame: HTMLElement = document.getElementById("newGame");
    let loadGame: HTMLElement = document.getElementById("loadGame");
    newGame.addEventListener("click", start);
    //loadGame.addEventListener("click", load);

    function start(): void {      
      window.open("game.html");
    }
  }

  function fetchAudios(): void {
    let attack: HTMLAudioElement = new Audio();
    attack.src = "../Game/Assets/attack.wav";
    attack.load();

    let select: HTMLAudioElement = new Audio();
    select.src = "../Game/Assets/select.wav";
    select.load();

    let pickUp: HTMLAudioElement = new Audio();
    pickUp.src = "../Game/Assets/pickUp.wav";
    pickUp.load();

    let jump: HTMLAudioElement = new Audio();
    jump.src = "../Game/Assets/jump.wav";
    jump.load();

    let hurt: HTMLAudioElement = new Audio();
    hurt.src = "../Game/Assets/hurt.wav";
    hurt.load();

    Util.getInstance().attackSound = attack;
    Util.getInstance().selectSound = select;
    Util.getInstance().pickUpSound = pickUp;
    Util.getInstance().jumpSound = jump;
    Util.getInstance().hurtSound = hurt;
  }
}