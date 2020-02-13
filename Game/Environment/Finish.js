"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Finish extends Game.Environment {
        constructor(nodeName) {
            super(nodeName, "Platform");
            this.cmpTransform.local.translateY(1);
            let material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 0, 1, 1)));
            this.addComponent(new fudge.ComponentMaterial(material));
        }
    }
    Game.Finish = Finish;
})(Game || (Game = {}));
//# sourceMappingURL=Finish.js.map