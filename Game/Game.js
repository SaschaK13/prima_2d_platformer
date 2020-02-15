"use strict";
var Game;
(function (Game) {
    window.onload = addEventlisteners;
    function addEventlisteners() {
        let restart = document.getElementById("restart");
        let backToMenu = document.getElementById("backToMenu");
        let safe = document.getElementById("safe");
        let nextLevel = document.getElementById("nextLevel");
        restart.addEventListener("click", reload);
        backToMenu.addEventListener("click", goBack);
        safe.addEventListener("click", safeGame);
        nextLevel.addEventListener("click", next);
        function reload() {
            location.reload();
        }
        function goBack() {
            window.history.back();
        }
        function safeGame() {
            var safeName = window.prompt("Enter your safe game name: ");
            Game.Util.getInstance().save(safeName);
            next();
        }
        function next() {
            document.getElementById("safeGame").style.visibility = "hidden";
            Game.Util.getInstance().loadNextLevel();
        }
    }
})(Game || (Game = {}));
//# sourceMappingURL=Game.js.map