namespace Game {

  import fudge = FudgeCore;

  window.onload = addEventlisteners;

  function addEventlisteners(): void {
    let restart: HTMLElement = document.getElementById("restart");
    let backToMenu: HTMLElement = document.getElementById("backToMenu");

    let safe: HTMLElement = document.getElementById("safe");
    let nextLevel: HTMLElement = document.getElementById("nextLevel");

    let restart_menu: HTMLElement = document.getElementById("restart_menu");
    let backToMenu_menu: HTMLElement = document.getElementById("backToMenu_menu");
    let controls_menu: HTMLElement = document.getElementById("controls_menu");
    let goBackButton: HTMLElement = document.getElementById("back");
    let backToGame: HTMLElement = document.getElementById("backToGame");

    restart.addEventListener("click", reload);
    backToMenu.addEventListener("click", goBack);

    safe.addEventListener("click", safeGame);
    nextLevel.addEventListener("click", next);

    restart_menu.addEventListener("click", reload);
    backToMenu_menu.addEventListener("click", goBack);
    controls_menu.addEventListener("click", openControls);
    goBackButton.addEventListener("click", closeControls);
    backToGame.addEventListener("click", closeIngameMenu)

    function reload(): void {
      Util.getInstance().selectSound.play();
      location.reload();
    }

    function goBack(): void {
      Util.getInstance().selectSound.play();
      window.history.back();
    }

    function safeGame(): void {
      Util.getInstance().selectSound.play();
      var safeName: string = window.prompt("Enter your safe game name: ");
      Util.getInstance().save(safeName);
      next();
    }

    function next(): void {
      Util.getInstance().selectSound.play();
      document.getElementById("safeGame").style.visibility = "hidden";
      Util.getInstance().loadNextLevel();
    }

    function openControls(): void {
      document.getElementById("ingameControls").style.visibility = "visible";
    }

    function closeControls(): void {
      document.getElementById("ingameControls").style.visibility = "hidden";
    }

    function closeIngameMenu(): void {
      document.getElementById("ingameMenu").style.visibility = "hidden";
    }
  }
}