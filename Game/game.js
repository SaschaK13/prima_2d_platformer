"use strict";
var Game;
(function (Game) {
    window.onload = addEventlisteners;
    function addEventlisteners() {
        let restart = document.getElementById("restart");
        let backToMenu = document.getElementById("backToMenu");
        let safe = document.getElementById("safe");
        let nextLevel = document.getElementById("nextLevel");
        let restart_menu = document.getElementById("restart_menu");
        let backToMenu_menu = document.getElementById("backToMenu_menu");
        let controls_menu = document.getElementById("controls_menu");
        let goBackButton = document.getElementById("back");
        restart.addEventListener("click", reload);
        backToMenu.addEventListener("click", goBack);
        safe.addEventListener("click", safeGame);
        nextLevel.addEventListener("click", next);
        restart_menu.addEventListener("click", reload);
        backToMenu_menu.addEventListener("click", goBack);
        controls_menu.addEventListener("click", openControls);
        goBackButton.addEventListener("click", closeControls);
        function reload() {
            Game.Util.getInstance().selectSound.play();
            location.reload();
        }
        function goBack() {
            Game.Util.getInstance().selectSound.play();
            window.history.back();
        }
        function safeGame() {
            Game.Util.getInstance().selectSound.play();
            var safeName = window.prompt("Enter your safe game name: ");
            Game.Util.getInstance().save(safeName);
            next();
        }
        function next() {
            Game.Util.getInstance().selectSound.play();
            document.getElementById("safeGame").style.visibility = "hidden";
            Game.Util.getInstance().loadNextLevel();
        }
        function openControls() {
            document.getElementById("ingameControls").style.visibility = "visible";
        }
        function closeControls() {
            document.getElementById("ingameControls").style.visibility = "hidden";
        }
    }
})(Game || (Game = {}));
//# sourceMappingURL=game.js.map