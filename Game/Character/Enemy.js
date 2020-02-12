"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Enemy extends Game.Character {
        constructor(name, spriteName, positionX, positionY, scaleX, scaleY) {
            super(name);
            this.name = name;
            super.spriteName = spriteName;
            this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
            this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);
            // let material: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 0, 1, 1)));
            // this.addComponent(new fudge.ComponentMaterial(material));
            super.addSpriteListener();
        }
        die() {
            this.getParent().removeChild(this);
            Game.Util.getInstance().level.deleteEnemy(this);
        }
    }
    Game.Enemy = Enemy;
})(Game || (Game = {}));
//# sourceMappingURL=Enemy.js.map