namespace Game {

  import fudge = FudgeCore;

  window.onload = addEventlisteners;

  function addEventlisteners(): void {
    let restart: HTMLElement = document.getElementById("restart");
    let backToMenu: HTMLElement = document.getElementById("backToMenu");

    restart.addEventListener("click", reload);
    backToMenu.addEventListener("click", goBack);

    function reload(): void {
      location.reload();
    }

    function goBack(): void {
      window.close();
    }
  }
}