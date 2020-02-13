"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class LevelGenerator {
        constructor(root) {
            this.levelObject = new Game.Level();
            this.backgroundLength = 15;
            this.root = root;
        }
        async getDataFromFile() {
            let response = await fetch("../Game/Assets/test.json");
            let offer = await response.text();
            this.data = JSON.parse(offer);
            this.generateLevel();
        }
        generateLevel() {
            let levelLength = this.data["levelLength"];
            let backgroundValue = this.data["background"];
            let numberOfBackground = Math.round(levelLength / backgroundValue.length);
            for (var i = 0; i < numberOfBackground; i++) {
                let background = new Game.Background(backgroundValue.name, backgroundValue.type, backgroundValue.spriteName, backgroundValue.length);
                background.cmpTransform.local.translation = new fudge.Vector3(i * this.backgroundLength, 0, -1);
                this.root.appendChild(background);
                this.levelObject.backgroundArray.push(background);
            }
            //background left
            let background = new Game.Background(backgroundValue.name, backgroundValue.type, backgroundValue.spriteName, backgroundValue.length);
            background.cmpTransform.local.translation = new fudge.Vector3(-15, 0, -1);
            this.root.appendChild(background);
            this.levelObject.backgroundArray.push(background);
            fudge.Debug.log(this.levelObject.backgroundArray);
            let playerValue = this.data["player"];
            let player = new Game.Player(playerValue.name, playerValue.spriteName, playerValue.positionX, playerValue.positionY, playerValue.scaleX, playerValue.scaleY);
            this.levelObject.player = player;
            player.isLoaded = true;
            this.root.appendChild(player);
            let platformArray = this.data["platformArray"];
            for (var i = 0; i < platformArray.length; i++) {
                let current = platformArray[i];
                let platform = new Game.Platform(current.name, current.type, current.spriteName, current.positionX, current.positionY, current.scaleX, current.scaleY);
                //this.root.appendChild(platform);
                this.levelObject.platformArray.push(platform);
            }
            let enemyArray = this.data["enemyArray"];
            for (var i = 0; i < enemyArray.length; i++) {
                let current = enemyArray[i];
                switch (current.spriteName) {
                    case "blob": {
                        let enemy = new Game.Blob(current.name, current.spriteName, current.positionX, current.positionY, current.scaleX, current.scaleX);
                        // this.root.appendChild(enemy);
                        this.levelObject.enemyArray.push(enemy);
                        break;
                    }
                    case "goblin": {
                        let enemy = new Game.Goblin(current.name, current.spriteName, current.positionX, current.positionY, current.scaleX, current.scaleX);
                        // this.root.appendChild(enemy);
                        this.levelObject.enemyArray.push(enemy);
                        break;
                    }
                }
            }
            let itemArray = this.data["itemArray"];
            for (var i = 0; i < itemArray.length; i++) {
                let current = itemArray[i];
                let item = new Game.Item(current.name, current.spriteName, current.hp, current.dmg, current.jumpHeight, current.walkSpeed, current.attackSpeed);
                this.levelObject.possibleItemsArray.push(item);
                fudge.Debug.log(this.levelObject.possibleItemsArray);
            }
            this.levelObject.setRoot(this.root);
            let util = Game.Util.getInstance();
            util.level = this.levelObject;
        }
    }
    Game.LevelGenerator = LevelGenerator;
})(Game || (Game = {}));
//# sourceMappingURL=LevelGenerator.js.map