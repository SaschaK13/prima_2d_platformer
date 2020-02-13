"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Background extends Game.Environment {
        constructor(name, type, spriteName, length) {
            super(name, type);
            this.name = name;
            this.length = length;
            super.spriteName = spriteName;
            // this.cmpTransform.local.translation = new fudge.Vector3(0, 0, -1);
            this.cmpTransform.local.scaling = new fudge.Vector3(1, 1, 0);
            // let material: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 0, 1, 1)));
            // this.addComponent(new fudge.ComponentMaterial(material));
            super.addSpriteListener();
        }
    }
    Game.Background = Background;
})(Game || (Game = {}));
//# sourceMappingURL=Background.js.map