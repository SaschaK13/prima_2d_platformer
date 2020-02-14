"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Util {
        constructor() { }
        static getInstance() {
            if (!Util.instance) {
                Util.instance = new Util();
            }
            return Util.instance;
        }
        getTextureImageBy(name, state) {
            let img = document.querySelector("#" + name + "_" + state);
            let texture = new fudge.TextureImage();
            texture.image = img;
            return texture;
        }
        getRandomRange(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }
        gameOver() {
            let gameOver = document.getElementById("gameOver");
            gameOver.style.visibility = "visible";
            let canvas = document.getElementById("canvas");
            canvas.style.opacity = "0.5";
            let statBox = document.getElementById("stats");
            statBox.style.opacity = "0.5";
        }
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        async save(fileName) {
            let jsonString = this.createSavegame();
            let map = { [fileName]: jsonString };
            fudge.FileIoBrowserLocal.save(map);
        }
        fetchAudios() {
            this.attackSound = new Audio();
            this.attackSound.src = "../Game/Assets/sounds/attack.wav";
            this.attackSound.load();
            this.selectSound = new Audio();
            this.selectSound.src = "../Game/Assets/sounds/select.wav";
            this.selectSound.load();
            this.pickUpSound = new Audio();
            this.pickUpSound.src = "../Game/Assets/sounds/pickUp.wav";
            this.pickUpSound.load();
            this.jumpSound = new Audio();
            this.jumpSound.src = "../Game/Assets/sounds/jump.wav";
            this.jumpSound.load();
            this.hurtSound = new Audio();
            this.hurtSound.src = "../Game/Assets/sounds/hurt.wav";
            this.hurtSound.load();
            this.themeSound = new Audio();
            this.themeSound.src = "../Game/Assets/sounds/theme.wav";
            this.themeSound.load();
        }
        loadNextLevel() {
            this.deleteAllNodes();
            this.collidableNode = new fudge.Node("Colidable");
            this.lvlGenerator = new Game.LevelGenerator(this.collidableNode);
            this.rootNode.appendChild(this.collidableNode);
            this.lvlGenerator.getDataFromFile("level2");
            this.gui.updateHealth();
        }
        createSavegame() {
            return " {\"levelName\": \"level" + (this.level.levelNumber + 1) + "\", \"hp\": " + this.level.player.getStats().hp + " , \"dmg\": " + this.level.player.getStats().dmg + ", \"jumpHeight\": " + this.level.player.getStats().jumpHeight + ", \"walkSpeed\": " + this.level.player.getStats().walkSpeed + ", \"attackSpeed\":" + this.level.player.getStats().attackSpeed + " } ";
        }
        deleteAllNodes() {
            let childs = this.collidableNode.getChildren();
            for (var i = 0; i < childs.length; i++) {
                this.collidableNode.removeChild(childs[i]);
            }
            this.collidableNode.getParent().removeChild(this.collidableNode);
            for (var i = 0; i < this.level.enemyArray.length; i++) {
                let enemy = this.level.enemyArray[i];
                for (var j = 0; j < enemy.getChildren().length; j++) {
                    let child = enemy.getChildren()[j];
                    enemy.removeChild(child);
                }
            }
            this.lvlGenerator = null;
            this.level = null;
        }
    }
    Game.Util = Util;
})(Game || (Game = {}));
//# sourceMappingURL=Util.js.map