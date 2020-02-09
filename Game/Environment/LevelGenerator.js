"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class LevelGenerator {
        constructor(root) {
            this.levelObject = new Game.Level();
            this.root = root;
        }
        async getDataFromFile() {
            let response = await fetch("../Game/Assets/test.json");
            let offer = await response.text();
            this.level = JSON.parse(offer);
            this.generateLevel();
        }
        generateLevel() {
            let platformArray = this.level["platformArray"];
            for (var i = 0; i < platformArray.length; i++) {
                let current = platformArray[i];
                let platform = new Game.Platform(current.name, current.type, current.positionX, current.positionY, current.scaleX, current.scaleY);
                this.levelObject.platformArray.push(platform);
                this.root.appendChild(platform);
            }
            fudge.Debug.log(this.levelObject);
        }
    }
    Game.LevelGenerator = LevelGenerator;
})(Game || (Game = {}));
//# sourceMappingURL=LevelGenerator.js.map