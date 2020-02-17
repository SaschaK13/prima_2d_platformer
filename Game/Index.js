"use strict";
var fudge = FudgeCore;
window.onload = addEventlisteners;
function addEventlisteners() {
    let play = document.getElementById("play");
    play.addEventListener("click", loadGame);
}
function loadGame() {
    window.open("startScreen", "_self", "fullscreen=yes", true);
}
//# sourceMappingURL=index.js.map