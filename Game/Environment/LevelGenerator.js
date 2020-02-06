"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class LevelGenerator {
        async loadFile() {
            let response = await fetch("../Game/Assets/test.json");
            let offer = await response.text();
            let data = JSON.parse(offer);
            fudge.Debug.log(data);
        }
    }
    Game.LevelGenerator = LevelGenerator;
})(Game || (Game = {}));
//# sourceMappingURL=LevelGenerator.js.map