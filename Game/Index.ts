namespace Game {

  import fudge = FudgeCore;

  window.onload = addEventlisteners;

  let select: HTMLAudioElement;
  let theme: HTMLAudioElement;

  let music: HTMLElement;
  let sounds: HTMLElement;

  let musicValue: number;
  let soundsValue: number;

  function addEventlisteners(): void {

    fetchAudios();
    playThemeSound();

    let newGame: HTMLElement = document.getElementById("newGame");
    let loadGame: HTMLElement = document.getElementById("loadGame");
    let settings: HTMLElement = document.getElementById("settings");
    let closeSettings: HTMLElement = document.getElementById("closeSettings");

    newGame.addEventListener("click", start);
    loadGame.addEventListener("click", loadButton);
    settings.addEventListener("click", openSettings);
    closeSettings.addEventListener("click", close);

    music = document.getElementById("music");
    sounds = document.getElementById("sounds");

    music.addEventListener("click", handleInputMusic);
    sounds.addEventListener("click", handleInputSounds);

  }

  function start(): void {
    select.play();
    window.open("http://localhost:5000/Game/game", "_self" , "fullscreen=yes" , true);
  }

  function loadButton(): void {
    select.play();
    load();
  }

  function openSettings(): void {
    document.getElementById("settingsBox").style.visibility = "visible";
  }

  function close(): void {
    select.play();
    document.getElementById("settingsBox").style.visibility = "hidden";
  }

  function handleInputMusic(): void {
    select.play();
    musicValue = music.value;
  }

  function handleInputSounds(): void {
    select.play();
    soundsValue = sounds.value;
  }


  function fetchAudios(): void {
    select = new Audio();
    select.src = "../Game/Assets/sounds/select.wav";
    select.load();

    theme = new Audio();
    theme.src = "../Game/Assets/sounds/menu.wav";
    theme.load();

    Util.getInstance().selectSound = select;
    Util.getInstance().pickUpSound = theme;
  }

  function playThemeSound(): void  {
    theme.loop = true;
    theme.play();
  }

  function gotClicked(): void {
    let buttonName = this.name as string;
    
    //window.location.href = "http://localhost:5000/Game/game?W=WW"
    //
  }

  async function load(): Promise<void> {
    fudge.FileIoBrowserLocal.addEventListener(fudge.EVENT.FILE_LOADED, handleContentLoaded);
    fudge.FileIoBrowserLocal.load();
  }

  function handleContentLoaded(_event: CustomEvent): void {
    let map: fudge.MapFilenameToContent = _event.detail.mapFilenameToContent;
    console.log("Map", map);
    for (let filename in map) {
      let content: string = map[filename];
      fudge.FileIoBrowserLocal.removeEventListener(fudge.EVENT.FILE_LOADED, handleContentLoaded);
      window.open("http://localhost:5000/Game/game?saveGamejson="+ content, "_self" , "fullscreen=yes" , true);
    }
  }
}