"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class WizzardSpell extends Game.Environment {
        constructor(name, type, spriteName, positionX, positionY, scaleX, scaleY) {
            super(name, type);
            this.liefetime = 150;
            this.currentLifetime = 0;
            this.shotdirection = -1;
            this.behavior = (_event) => {
                let timeFrame = fudge.Loop.timeFrameGame / 1000;
                if (this.currentLifetime == this.liefetime) {
                    Game.Util.getInstance().level.removeWizzardSpell(this);
                    this.removeEventListener("loopFrame" /* LOOP_FRAME */, this.behavior);
                }
                else {
                    this.cmpTransform.local.translateX((7 * timeFrame) * this.shotdirection);
                    this.currentLifetime++;
                }
            };
            this.name = name;
            super.spriteName = spriteName;
            this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
            this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.behavior);
            super.addSpriteListener();
        }
    }
    Game.WizzardSpell = WizzardSpell;
})(Game || (Game = {}));
//# sourceMappingURL=WizzardSpell.js.map