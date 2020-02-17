namespace Game {

  import fudge = FudgeCore;

  window.onload = addEventlisteners;

  function addEventlisteners(): void {
    let restart: HTMLElement = document.getElementById("restart");
    let backToMenu: HTMLElement = document.getElementById("backToMenu");

    let safe: HTMLElement = document.getElementById("safe");
    let nextLevel: HTMLElement = document.getElementById("nextLevel");

    restart.addEventListener("click", reload);
    backToMenu.addEventListener("click", goBack);

    safe.addEventListener("click", safeGame);
    nextLevel.addEventListener("click", next);

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
  }
}