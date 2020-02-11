"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    window.onload = addEventlisteners;
    function addEventlisteners() {
        let newGame = document.getElementById("newGame");
        let loadGame = document.getElementById("loadGame");
        newGame.addEventListener("click", start);
        loadGame.addEventListener("click", load);
        function start() {
            fudge.Debug.log("start");
            window.open("game.html");
        }
        function load() {
            fudge.Debug.log("load");
        }
    }
})(Game || (Game = {}));
//# sourceMappingURL=StartScreen.js.map