"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class WizzardSpell extends Game.Environment {
        constructor(name, type, spriteName, positionX, positionY, scaleX, scaleY) {
            super(name, type);
            this.liefetime = 100;
            this.currentLifetime = 0;
            this.shotdirection = -1;
            this.behavior = (_event) => {
                let timeFrame = fudge.Loop.timeFrameGame / 1000;
                if (this.currentLifetime == this.liefetime) {
                    Game.Util.getInstance().level.removeWizzardSpell(this);
                    this.removeEventListener("loopFrame" /* LOOP_FRAME */, this.behavior);
                }
                else
                    this.cmpTransform.local.translateX((5 * timeFrame) * this.shotdirection);
                this.currentLifetime++;
            };
            this.name = name;
            super.spriteName = spriteName;
            this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
            this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);
            // let material: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 0, 1, 1)));
            // this.addComponent(new fudge.ComponentMaterial(material));
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.behavior);
            super.addSpriteListener();
        }
    }
    Game.WizzardSpell = WizzardSpell;
})(Game || (Game = {}));
//# sourceMappingURL=WizzardSpell.js.map