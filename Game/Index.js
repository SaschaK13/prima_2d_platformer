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
        loadGame.addEventListener("click", loadButton);
    }
    function start() {
        select.play();
        window.open("http://localhost:5000/Game/game", "_self", "fullscreen=yes", true);
    }
    function loadButton() {
        load();
    }
    function fetchAudios() {
        select = new Audio();
        select.src = "../Game/Assets/sounds/select.wav";
        select.load();
        theme = new Audio();
        theme.src = "../Game/Assets/sounds/menu.wav";
        theme.load();
        Game.Util.getInstance().selectSound = select;
        Game.Util.getInstance().pickUpSound = theme;
    }
    function playThemeSound() {
        theme.loop = true;
        theme.play();
    }
    function gotClicked() {
        let buttonName = this.name;
        //window.location.href = "http://localhost:5000/Game/game?W=WW"
        //
    }
    async function load() {
        fudge.FileIoBrowserLocal.addEventListener("fileLoaded" /* FILE_LOADED */, handleContentLoaded);
        fudge.FileIoBrowserLocal.load();
    }
    function handleContentLoaded(_event) {
        let map = _event.detail.mapFilenameToContent;
        console.log("Map", map);
        for (let filename in map) {
            let content = map[filename];
            fudge.FileIoBrowserLocal.removeEventListener("fileLoaded" /* FILE_LOADED */, handleContentLoaded);
            window.open("http://localhost:5000/Game/game?saveGamejson=" + content, "_self", "fullscreen=yes", true);
        }
    }
})(Game || (Game = {}));
//# sourceMappingURL=Index.js.map