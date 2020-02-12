"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    let enemyType;
    (function (enemyType) {
        enemyType["BLOB"] = "blob";
    })(enemyType = Game.enemyType || (Game.enemyType = {}));
    class Enemy extends Game.Character {
        constructor(name, spriteName, enemyType, positionX, positionY, scaleX, scaleY) {
            super(name);
            this.name = name;
            super.spriteName = spriteName;
            this.enemyType = enemyType;
            this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
            this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);
            let material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 1, 0, 1)));
            this.addComponent(new fudge.ComponentMaterial(material));
        }
        die() {
            this.getParent().removeChild(this);
            Game.Util.getInstance().level.deleteEnemy(this);
        }
    }
    Game.Enemy = Enemy;
})(Game || (Game = {}));
//# sourceMappingURL=Enemy.js.map