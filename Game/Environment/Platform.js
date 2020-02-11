"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Platform extends Game.Environment {
        constructor(name, type, positionX, positionY, scaleX, scaleY) {
            super(name, type);
            this.name = name;
            this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
            this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);
            let material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 0, 1, 1)));
            this.addComponent(new fudge.ComponentMaterial(material));
        }
    }
    Game.Platform = Platform;
})(Game || (Game = {}));
//# sourceMappingURL=Platform.js.map