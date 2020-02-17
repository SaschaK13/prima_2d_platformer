namespace Game {

  import fudge = FudgeCore;

  window.onload = addEventlisteners;

  function addEventlisteners(): void {
    
    let backToMenu = document.getElementById("backToMenu");

    let theme = new Audio();
    theme.src = "Assets/sounds/endscreen.wav";
    theme.load();
    theme.loop = true;
    theme.play();

    backToMenu.addEventListener("click", goBack);
  }

  function goBack(): void {
    window.history.back();
    window.history.back();
  }



}