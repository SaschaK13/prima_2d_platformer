"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    window.onload = addEventlisteners;
    let select;
    let theme;
    function addEventlisteners() {
        fetchAudios();
        playThemeSound();
        let newGame = document.getElementById("newGame");
        let loadGame = document.getElementById("loadGame");
        newGame.addEventListener("click", start);
        loadGame.addEventListener("click", load);
    }
    function start() {
        select.play();
        window.open("game.html");
    }
    function load() {
        let loadList = document.getElementById("loadList");
        let safes = ["hi", "bye", "babye", "BAAAAABYEEEE"];
        loadList.style.visibility = "visible";
        for (const safe of safes) {
            let br = document.createElement("br");
            let newSafe = document.createElement("button");
            fudge.Debug.log(safe);
            newSafe.value = safe;
            newSafe.name = safe;
            newSafe.id = safe;
            newSafe.appendChild(document.createTextNode(safe));
            newSafe.style.width = "400px";
            newSafe.style.height = "50px";
            newSafe.style.fontSize = "x-large";
            newSafe.style.margin = "20px";
            newSafe.style.overflow = "hidden";
            newSafe.addEventListener("click", gotClicked);
            loadList.appendChild(newSafe);
            loadList.appendChild(br);
        }
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
    function gotClicked() {
        let buttonName = this.name;
        //
    }
})(Game || (Game = {}));
//# sourceMappingURL=Index.js.map