"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class LevelGenerator {
        async getDataFromFile() {
            let response = await fetch("../Game/Assets/test.json");
            let offer = await response.text();
            this.level = JSON.parse(offer);
            fudge.Debug.log(this.level.platformArray[0].name);
        }
        generateLevel() {
            let platformArray = this.level.platformArray;
            for (var i = 0; i < platformArray.length; i++) {
                platformArray[i].instantiatePlatform();
            }
        }
    }
    Game.LevelGenerator = LevelGenerator;
})(Game || (Game = {}));
//# sourceMappingURL=LevelGenerator.js.map