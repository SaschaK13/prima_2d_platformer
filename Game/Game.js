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
    }
})(Game || (Game = {}));
//# sourceMappingURL=Game.js.map