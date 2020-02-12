"use strict";
var Game;
(function (Game) {
    window.onload = addEventlisteners;
    function addEventlisteners() {
        let newGame = document.getElementById("newGame");
        let loadGame = document.getElementById("loadGame");
        newGame.addEventListener("click", start);
        loadGame.addEventListener("click", load);
        function start() {
            window.open("game.html");
        }
        function load() {
        }
    }
})(Game || (Game = {}));
//# sourceMappingURL=Index.js.map