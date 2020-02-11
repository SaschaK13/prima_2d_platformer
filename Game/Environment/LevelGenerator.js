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
            this.level = JSON.parse(offer);
            this.generateLevel();
        }
        generateLevel() {
            let value = this.level["player"];
            let player = new Game.Player(value.name, value.positionX, value.positionY, value.scaleX, value.scaleY);
            this.levelObject.player = player;
            this.root.appendChild(player);
            let platformArray = this.level["platformArray"];
            for (var i = 0; i < platformArray.length; i++) {
                let current = platformArray[i];
                let platform = new Game.Platform(current.name, current.type, current.positionX, current.positionY, current.scaleX, current.scaleY);
                this.levelObject.platformArray.push(platform);
                this.root.appendChild(platform);
            }
            let enemyArray = this.level["enemyArray"];
            for (var i = 0; i < enemyArray.length; i++) {
                let current = enemyArray[i];
                let enemy = new Game.Enemy(current.name, current.positionX, current.positionY, current.scaleX, current.scaleY);
                this.levelObject.enemyArray.push(enemy);
                this.root.appendChild(enemy);
            }
            let util = Game.Util.getInstance();
            util.setCollidableObjects(this.root.getChildren());
            util.level.player = player;
            util.level.enemyArray = enemyArray;
            util.level.platformArray = platformArray;
        }
    }
    Game.LevelGenerator = LevelGenerator;
})(Game || (Game = {}));
//# sourceMappingURL=LevelGenerator.js.map