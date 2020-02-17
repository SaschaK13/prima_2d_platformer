namespace Game {

  import fudge = FudgeCore;

  window.onload = addEventlisteners;

  function addEventlisteners(): void {
    
    let backToMenu = document.getElementById("backToMenu");

    backToMenu.addEventListener("click", goBack);
  }

  function goBack(): void {
    window.history.back();
    window.history.back();
  }



}