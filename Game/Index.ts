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
    loadGame.addEventListener("click", load);
  }


  function start(): void {
    select.play();
    window.open("http://localhost:5000/Game/game", "_self" , "fullscreen=yes" , true);
  }

  function load(): void {
    let loadList = document.getElementById("loadList");
    let safes: string[] = ["hi", "bye", "babye", "BAAAAABYEEEE"];

    loadList.style.visibility = "visible";
    for (const safe of safes) {
      let br = document.createElement("br"); 
      let newSafe: HTMLButtonElement = document.createElement("button");
      fudge.Debug.log(safe);
      newSafe.value = safe;
      newSafe.name = safe;
      newSafe.id = safe;
      newSafe.appendChild(document.createTextNode(safe));
      newSafe.style.width = "400px";
      newSafe.style.height = "50px";
      newSafe.style.fontSize = "x-large";
      newSafe.style.margin = "20px";
      newSafe.style.overflow = "hidden";
      newSafe.addEventListener("click", gotClicked);
      loadList.appendChild(newSafe);
      loadList.appendChild(br);
      }
  }

  function fetchAudios(): void {

    select = new Audio();
    select.src = "../Game/Assets/sounds/select.wav";
    select.load();

    theme = new Audio();
    theme.src = "../Game/Assets/sounds/theme.wav";
    theme.load();


    Util.getInstance().selectSound = select;
    Util.getInstance().pickUpSound = theme;
  }

  function playThemeSound(): void  {
    theme.play();
  }

  function gotClicked(): void {
    let buttonName = this.name as string;
    window.open("http://localhost:5000/Game/game?saveGameName="+ buttonName, "_self" , "fullscreen=yes" , true);
    //window.location.href = "http://localhost:5000/Game/game?W=WW"
    //
  }

}