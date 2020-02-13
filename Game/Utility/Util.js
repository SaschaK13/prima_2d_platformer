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
        fetchAudios() {
            this.attackSound = new Audio();
            this.attackSound.src = "../Game/Assets/attack.wav";
            this.attackSound.load();
            this.selectSound = new Audio();
            this.selectSound.src = "../Game/Assets/select.wav";
            this.selectSound.load();
            this.pickUpSound = new Audio();
            this.pickUpSound.src = "../Game/Assets/pickUp.wav";
            this.pickUpSound.load();
            this.jumpSound = new Audio();
            this.jumpSound.src = "../Game/Assets/jump.wav";
            this.jumpSound.load();
            this.hurtSound = new Audio();
            this.hurtSound.src = "../Game/Assets/hurt.wav";
            this.hurtSound.load();
            this.themeSound = new Audio();
            this.themeSound.src = "../Game/Assets/theme.wav";
            this.themeSound.load();
        }
    }
    Game.Util = Util;
})(Game || (Game = {}));
//# sourceMappingURL=Util.js.map