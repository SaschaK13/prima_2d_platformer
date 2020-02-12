"use strict";
var Game;
(function (Game) {
    class LevelGenerator {
        constructor(root) {
            this.levelObject = new Game.Level();
            this.root = root;
        }
        async getDataFromFile() {
            let response = await fetch("../Game/Assets/test.json");
            let offer = await response.text();
            this.data = JSON.parse(offer);
            this.generateLevel();
        }
        generateLevel() {
            let value = this.data["player"];
            let player = new Game.Player(value.name, value.spriteName, value.positionX, value.positionY, value.scaleX, value.scaleY);
            this.levelObject.player = player;
            this.root.appendChild(player);
            let platformArray = this.data["platformArray"];
            for (var i = 0; i < platformArray.length; i++) {
                let current = platformArray[i];
                let platform = new Game.Platform(current.name, current.type, current.spriteName, current.positionX, current.positionY, current.scaleX, current.scaleY);
                this.root.appendChild(platform);
                this.levelObject.platformArray.push(platform);
            }
            let enemyArray = this.data["enemyArray"];
            for (var i = 0; i < enemyArray.length; i++) {
                let current = enemyArray[i];
                let enemy = new Game.Enemy(current.name, current.spriteName, current.positionX, current.positionY, current.scaleX, current.scaleY);
                this.root.appendChild(enemy);
                this.levelObject.enemyArray.push(enemy);
            }
            let util = Game.Util.getInstance();
            util.level = this.levelObject;
        }
    }
    Game.LevelGenerator = LevelGenerator;
})(Game || (Game = {}));
//# sourceMappingURL=LevelGenerator.js.map