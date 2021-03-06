"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    window.onload = addEventlisteners;
    let select;
    let theme;
    let music;
    let sounds;
    let musicValue = 100;
    let soundsValue = 100;
    function addEventlisteners() {
        fetchAudios();
        playThemeSound();
        let newGame = document.getElementById("newGame");
        let loadGame = document.getElementById("loadGame");
        let settings = document.getElementById("settings");
        let story = document.getElementById("story");
        let closeSettings = document.getElementById("closeSettings");
        let closeStory = document.getElementById("closeStory");
        let controls = document.getElementById("controls");
        let closeControls = document.getElementById("closeControls");
        newGame.addEventListener("click", start);
        loadGame.addEventListener("click", loadButton);
        settings.addEventListener("click", openSettings);
        story.addEventListener("click", openStory);
        closeSettings.addEventListener("click", close);
        closeStory.addEventListener("click", close);
        controls.addEventListener("click", openControls);
        closeControls.addEventListener("click", close);
        music = document.getElementById("music");
        sounds = document.getElementById("sounds");
        music.addEventListener("click", handleInputMusic);
        sounds.addEventListener("click", handleInputSounds);
    }
    function start() {
        select.play();
        musicValue = music.value;
        soundsValue = sounds.value;
        window.open("game?musicVol=" + musicValue + "&soundVol=" + soundsValue, "_self", "fullscreen=yes", true);
    }
    function loadButton() {
        select.play();
        musicValue = music.value;
        soundsValue = sounds.value;
        load();
    }
    function openSettings() {
        select.play();
        if (document.getElementById("controlsBox").style.visibility == "visible" || document.getElementById("storyBox").style.visibility == "visible") {
            document.getElementById("controlsBox").style.visibility = "hidden";
            document.getElementById("storyBox").style.visibility = "hidden";
        }
        document.getElementById("settingsBox").style.visibility = "visible";
    }
    function openStory() {
        select.play();
        if (document.getElementById("controlsBox").style.visibility == "visible" || document.getElementById("settingsBox").style.visibility == "visible") {
            document.getElementById("controlsBox").style.visibility = "hidden";
            document.getElementById("settingsBox").style.visibility = "hidden";
        }
        document.getElementById("storyBox").style.visibility = "visible";
    }
    function openControls() {
        select.play();
        if (document.getElementById("settingsBox").style.visibility == "visible" || document.getElementById("storyBox").style.visibility == "visible") {
            document.getElementById("settingsBox").style.visibility = "hidden";
            document.getElementById("storyBox").style.visibility = "hidden";
        }
        document.getElementById("controlsBox").style.visibility = "visible";
    }
    function close() {
        select.play();
        document.getElementById("settingsBox").style.visibility = "hidden";
        document.getElementById("controlsBox").style.visibility = "hidden";
        document.getElementById("storyBox").style.visibility = "hidden";
    }
    function handleInputMusic() {
        select.play();
        theme.volume = Game.Util.getInstance().numberToOneDecimal((parseInt(music.value) / 100));
    }
    function handleInputSounds() {
        select.play();
        select.volume = Game.Util.getInstance().numberToOneDecimal((parseInt(sounds.value) / 100));
    }
    function fetchAudios() {
        select = new Audio();
        select.src = "Assets/sounds/select.wav";
        select.load();
        theme = new Audio();
        theme.src = "Assets/sounds/menu.wav";
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
            window.open("game?musicVol=" + musicValue + "&soundVol=" + soundsValue + "&saveGamejson=" + content, "_self", "fullscreen=yes", true);
        }
    }
})(Game || (Game = {}));
//# sourceMappingURL=startScreen.js.map