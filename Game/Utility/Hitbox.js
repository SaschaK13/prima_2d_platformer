"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Hitbox extends fudge.Node {
        constructor(nodeName, parentNode, scaling) {
            super(nodeName);
            this.parentNode = parentNode;
            this.scaling = scaling;
            let material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0.3, 1, 1, 1)));
            let cmpMesh = new fudge.ComponentMesh(Hitbox.mesh);
            let cmpTransform = new fudge.ComponentTransform();
            this.addComponent(new fudge.ComponentMaterial(material));
            this.addComponent(cmpMesh);
            this.addComponent(cmpTransform);
            this.currentDirection = Game.DIRECTION.RIGHT;
            this.cmpTransform.local.translation = parentNode.cmpTransform.local.translation;
            this.cmpTransform.local.scaling = this.scaling.toVector3();
            this.cmpTransform.local.translateX((parentNode.cmpTransform.local.scaling.x / 2) + (this.cmpTransform.local.scaling.x / 2));
            parentNode.appendChild(this);
        }
        detectEnemys() {
            let x = this.cmpTransform.local.translation.x;
            let y = this.cmpTransform.local.translation.y;
            let width = this.cmpTransform.local.scaling.x;
            let height = this.cmpTransform.local.scaling.y;
            this.rectangle = new fudge.Rectangle(x, y, width, height, fudge.ORIGIN2D.CENTER);
            let detectedEnemys = [];
            if (this.parentNode.constructor.name == "Enemy") {
                if (this.rectangle.isInside(Game.Util.getInstance().player.cmpTransform.local.translation.toVector2())) {
                    detectedEnemys.push(Game.Util.getInstance().player);
                    return detectedEnemys;
                }
            }
            else if (this.parentNode.constructor.name == "Player") {
                for (var i = 0; i < Game.Util.getInstance().enemyArray.length; i++) {
                    let enemy = Game.Util.getInstance().enemyArray[i];
                    if (this.rectangle.isInside(enemy.cmpTransform.local.translation.toVector2())) {
                        detectedEnemys.push(enemy);
                    }
                }
                return detectedEnemys;
            }
        }
    }
    Hitbox.mesh = new fudge.MeshQuad;
    Game.Hitbox = Hitbox;
})(Game || (Game = {}));
//# sourceMappingURL=Hitbox.js.map