"use strict";
var Game;
(function (Game) {
    window.onload = addEventlisteners;
    function addEventlisteners() {
        let backToMenu = document.getElementById("backToMenu");
        let theme = new Audio();
        theme.src = "Assets/sounds/endscreen.wav";
        theme.load();
        theme.loop = true;
        theme.play();
        backToMenu.addEventListener("click", goBack);
    }
    function goBack() {
        window.history.back();
        window.history.back();
    }
})(Game || (Game = {}));
//# sourceMappingURL=endscreen.js.map