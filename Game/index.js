"use strict";
var Game;
(function (Game) {
    window.onload = addEventlisteners;
    function addEventlisteners() {
        let play = document.getElementById("play");
        play.addEventListener("click", loadGame);
    }
    function loadGame() {
        window.open("startScreen", "_self", "fullscreen=yes", true);
    }
})(Game || (Game = {}));
//# sourceMappingURL=index.js.map