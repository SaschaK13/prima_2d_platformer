"use strict";
var Game;
(function (Game) {
    window.onload = addEventlisteners;
    let select;
    let theme;
    function addEventlisteners() {
        fetchAudios();
        playThemeSound();
        let newGame = document.getElementById("newGame");
        let loadGame = document.getElementById("loadGame");
        newGame.addEventListener("click", start);
        //loadGame.addEventListener("click", load);
    }
    function start() {
        select.play();
        window.open("game.html");
    }
    function fetchAudios() {
        select = new Audio();
        select.src = "../Game/Assets/sounds/select.wav";
        select.load();
        theme = new Audio();
        theme.src = "../Game/Assets/sounds/theme.wav";
        theme.load();
        Game.Util.getInstance().selectSound = select;
        Game.Util.getInstance().pickUpSound = theme;
    }
    function playThemeSound() {
        theme.play();
    }
})(Game || (Game = {}));
//# sourceMappingURL=Index.js.map