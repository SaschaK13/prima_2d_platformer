"use strict";
var Game;
(function (Game) {
    window.onload = addEventlisteners;
    function addEventlisteners() {
        let restart = document.getElementById("restart");
        let backToMenu = document.getElementById("backToMenu");
        restart.addEventListener("click", reload);
        backToMenu.addEventListener("click", goBack);
        function reload() {
            location.reload();
        }
        function goBack() {
            window.close();
        }
    }
})(Game || (Game = {}));
//# sourceMappingURL=Game.js.map