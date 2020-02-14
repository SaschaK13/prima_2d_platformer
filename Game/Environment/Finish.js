"use strict";
var Game;
(function (Game) {
    class Finish extends Game.Environment {
        constructor(name, type, spriteName) {
            super(name, type);
            this.name = name;
            super.spriteName = spriteName;
            this.cmpTransform.local.translateX(20);
            // let material: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 0, 1, 1)));
            // this.addComponent(new fudge.ComponentMaterial(material));
            super.addSpriteListener();
        }
    }
    Game.Finish = Finish;
})(Game || (Game = {}));
//# sourceMappingURL=Finish.js.map