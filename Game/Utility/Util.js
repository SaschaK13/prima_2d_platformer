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
    }
    Game.Util = Util;
})(Game || (Game = {}));
//# sourceMappingURL=Util.js.map