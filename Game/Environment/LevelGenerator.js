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
        async getDataFromFile(levelName) {
            let response = await fetch("../Game/Assets/level/" + levelName + ".json");
            let offer = await response.text();
            this.data = JSON.parse(offer);
            this.generateLevel();
        }
        generateLevel() {
            let levelName = this.data["levelNumber"];
            this.levelObject.levelNumber = levelName;
            let levelLength = this.data["levelLength"];
            let backgroundValue = this.data["background"];
            let numberOfBackground = Math.floor(levelLength / backgroundValue.length) + 2; //so the background will surely not end
            for (var i = 0; i < numberOfBackground; i++) {
                let background = new Game.Background(backgroundValue.name, backgroundValue.type, backgroundValue.spriteName, backgroundValue.length);
                background.cmpTransform.local.translation = new fudge.Vector3(i * this.backgroundLength, 0, -1);
                //this.root.appendChild(background);
                this.levelObject.backgroundArray.push(background);
            }
            //background left
            let background = new Game.Background(backgroundValue.name, backgroundValue.type, backgroundValue.spriteName, backgroundValue.length);
            background.cmpTransform.local.translation = new fudge.Vector3(-15, 0, -1);
            this.root.appendChild(background);
            this.levelObject.backgroundArray.push(background);
            let playerValue = this.data["player"];
            let player = new Game.Player(playerValue.name, playerValue.spriteName, playerValue.positionX, playerValue.positionY, playerValue.scaleX, playerValue.scaleY);
            Game.Util.getInstance().gui.updateStats(player);
            player.isLoaded = true;
            this.root.appendChild(player);
            if (Game.Util.getInstance().currentSavegame) {
                let savegame = Game.Util.getInstance().currentSavegame;
                player.setStats({ hp: savegame.hp, dmg: savegame.dmg, jumpHeight: savegame.jumpHeight, attackSpeed: savegame.attackSpeed, walkSpeed: savegame.walkSpeed });
            }
            else if (Game.Util.getInstance().oldPlayer) {
                let oldPlayerStats = Game.Util.getInstance().oldPlayer.getStats();
                player.setStats({ hp: 10, dmg: oldPlayerStats.dmg, attackSpeed: oldPlayerStats.attackSpeed, jumpHeight: oldPlayerStats.jumpHeight, walkSpeed: oldPlayerStats.walkSpeed });
            }
            Game.Util.getInstance().gui.updateStats(player);
            this.levelObject.player = player;
            let finishValue = this.data["finish"];
            let finish = new Game.Finish(finishValue.name, finishValue.type, finishValue.spriteName);
            finish.cmpTransform.local.translateX(levelLength);
            finish.cmpTransform.local.translateZ(-1);
            this.levelObject.finish = finish;
            this.root.appendChild(finish);
            let theme = this.data["theme"];
            this.levelObject.theme = theme;
            let platformArray = this.data["platformArray"];
            for (var i = 0; i < platformArray.length; i++) {
                let current = platformArray[i];
                let platform = new Game.Platform(current.name, current.type, current.spriteName, current.positionX, current.positionY, current.scaleX, current.scaleY);
                this.levelObject.platformArray.push(platform);
            }
            let enemyArray = this.data["enemyArray"];
            for (var i = 0; i < enemyArray.length; i++) {
                let current = enemyArray[i];
                switch (current.spriteName) {
                    case "blob": {
                        let enemy = new Game.Blob(current.name, current.spriteName, current.positionX, current.positionY, current.scaleX, current.scaleY);
                        this.levelObject.enemyArray.push(enemy);
                        break;
                    }
                    case "goblin": {
                        let enemy = new Game.Goblin(current.name, current.spriteName, current.positionX, current.positionY, current.scaleX, current.scaleY);
                        this.levelObject.enemyArray.push(enemy);
                        break;
                    }
                    case "wizzard": {
                        fudge.Debug.log("created wizzard");
                        let enemy = new Game.Wizzard(current.name, current.spriteName, current.positionX, current.positionY, current.scaleX, current.scaleY);
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
            }
            this.levelObject.setRoot(this.root);
            let util = Game.Util.getInstance();
            util.level = this.levelObject;
            Game.Util.getInstance().setTheme(this.levelObject.theme);
            Game.Util.getInstance().themeSound.play();
        }
    }
    Game.LevelGenerator = LevelGenerator;
})(Game || (Game = {}));
//# sourceMappingURL=LevelGenerator.js.map