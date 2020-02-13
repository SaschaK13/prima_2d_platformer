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
        /*public isLoaded(node: fudge.Node, root: fudge.Node): boolean
        {
          let children: fudge.Node[] = root.getChildren();
          for(var i = 0; i < children.length; i++)
          {
            let n = children[i];
            if(n.name == node.name)
            {
              return true;
            }
          }
    
          return false;
        }*/
        save() {
            let jsonString = this.createSavegame();
            let map = { ["savegame.json"]: jsonString };
            fudge.FileIoBrowserLocal.save(map);
        }
        createSavegame() {
            return " {\"levelName\": \"" + this.level.levelName + "\", \"hp\": " + this.level.player.getStats().hp + " , \"dmg\": " + this.level.player.getStats().dmg + ", \"jumpHeight\": " + this.level.player.getStats().jumpHeight + ", \"walkSpeed\": " + this.level.player.getStats().walkSpeed + ", \"attackSpeed\":" + this.level.player.getStats().attackSpeed + " } ";
        }
    }
    Game.Util = Util;
})(Game || (Game = {}));
//# sourceMappingURL=Util.js.map