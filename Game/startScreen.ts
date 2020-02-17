namespace Game {

  import fudge = FudgeCore;

  window.onload = addEventlisteners;

  let select: HTMLAudioElement;
  let theme: HTMLAudioElement;

  let music: HTMLElement;
  let sounds: HTMLElement;

  let musicValue: number = 100;
  let soundsValue: number = 100;

  function addEventlisteners(): void {

    fetchAudios();
    playThemeSound();

    let newGame: HTMLElement = document.getElementById("newGame");
    let loadGame: HTMLElement = document.getElementById("loadGame");
    let settings: HTMLElement = document.getElementById("settings");
    let story: HTMLElement = document.getElementById("story");
    let closeSettings: HTMLElement = document.getElementById("closeSettings");
    let closeStory: HTMLElement = document.getElementById("closeStory");
    let controls: HTMLElement = document.getElementById("controls");
    let closeControls: HTMLElement = document.getElementById("closeControls");

    
    newGame.addEventListener("click", start);
    loadGame.addEventListener("click", loadButton);
    settings.addEventListener("click", openSettings);
    story.addEventListener("click", openStory);
    closeSettings.addEventListener("click", close);
    closeStory.addEventListener("click", close);
    controls.addEventListener("click", openControls);
    closeControls.addEventListener("click", close);

    music = document.getElementById("music");
    sounds = document.getElementById("sounds");

    music.addEventListener("click", handleInputMusic);
    sounds.addEventListener("click", handleInputSounds);

  }

  function start(): void {
    select.play();
    musicValue = music.value;
    soundsValue = sounds.value;
    window.open("game?musicVol=" + musicValue + "&soundVol=" + soundsValue, "_self" , "fullscreen=yes" , true);
  }

  function loadButton(): void {
    select.play();
    musicValue = music.value;
    soundsValue = sounds.value;
    load();
  }

  function openSettings(): void {
    select.play();
    if (document.getElementById("controlsBox").style.visibility == "visible" || document.getElementById("storyBox").style.visibility == "visible" ) {
      document.getElementById("controlsBox").style.visibility = "hidden";
      document.getElementById("storyBox").style.visibility = "hidden";

    }
    document.getElementById("settingsBox").style.visibility = "visible";
  }

  function openStory(): void {
    select.play();
    if (document.getElementById("controlsBox").style.visibility == "visible" || document.getElementById("settingsBox").style.visibility == "visible") {
      document.getElementById("controlsBox").style.visibility = "hidden";
      document.getElementById("settingsBox").style.visibility = "hidden";
    }
    document.getElementById("storyBox").style.visibility = "visible";
  }

  function openControls(): void {
    select.play();
    if (document.getElementById("settingsBox").style.visibility == "visible" || document.getElementById("storyBox").style.visibility == "visible") {
      document.getElementById("settingsBox").style.visibility = "hidden";
      document.getElementById("storyBox").style.visibility = "hidden";
    }
    document.getElementById("controlsBox").style.visibility = "visible";
  }

  function close(): void {
    select.play();
    document.getElementById("settingsBox").style.visibility = "hidden";
    document.getElementById("controlsBox").style.visibility = "hidden";
    document.getElementById("storyBox").style.visibility = "hidden";
  }

  function handleInputMusic(): void {
    select.play();
    theme.volume = Util.getInstance().numberToOneDecimal((parseInt(music.value)/100));
    
  }

  function handleInputSounds(): void {
    select.play();
    select.volume = Util.getInstance().numberToOneDecimal((parseInt(sounds.value)/100));
  }

  function fetchAudios(): void {
    select = new Audio();
    select.src = "Assets/sounds/select.wav";
    select.load();

    theme = new Audio();
    theme.src = "Assets/sounds/menu.wav";
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
      window.open("game?musicVol=" + musicValue + "&soundVol=" + soundsValue + "&saveGamejson=" + content, "_self" , "fullscreen=yes" , true);
    }
  }
}