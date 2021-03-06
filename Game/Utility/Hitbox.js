"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Hitbox extends fudge.Node {
        constructor(nodeName, parentNode, scaling) {
            super(nodeName);
            this.parentNode = parentNode;
            this.scaling = scaling;
            let cmpMesh = new fudge.ComponentMesh(Hitbox.mesh);
            let cmpTransform = new fudge.ComponentTransform();
            this.addComponent(cmpMesh);
            this.addComponent(cmpTransform);
            this.currentDirection = Game.DIRECTION.RIGHT;
            this.cmpTransform.local.translation = parentNode.cmpTransform.local.translation;
            this.cmpTransform.local.scaling = this.scaling.toVector3();
            this.cmpTransform.local.translateX((parentNode.cmpTransform.local.scaling.x / 2) + (this.cmpTransform.local.scaling.x / 2));
            parentNode.appendChild(this);
        }
        detectEnemys() {
            let x = this.mtxWorld.translation.x;
            let y = this.mtxWorld.translation.y;
            let width = this.cmpTransform.local.scaling.x;
            let height = this.cmpTransform.local.scaling.y;
            let detectedEnemys = [];
            if (this.parentNode.constructor.name == "Goblin") {
                if (this.collideWith(Game.Util.getInstance().level.player)) {
                    detectedEnemys.push(Game.Util.getInstance().level.player);
                }
            }
            else if (this.parentNode.constructor.name == "Player") {
                for (var i = 0; i < Game.Util.getInstance().level.enemyArray.length; i++) {
                    let enemy = Game.Util.getInstance().level.enemyArray[i];
                    if (this.collideWith(enemy) && enemy.isLoaded) {
                        detectedEnemys.push(enemy);
                    }
                }
            }
            return detectedEnemys;
        }
        collideWith(cObject) {
            let colissionObjectPosition = cObject.cmpTransform.local.translation;
            let colissionObjectScaling = cObject.cmpTransform.local.scaling;
            let characterPosition = this.mtxWorld.translation;
            let characterScaling = this.cmpTransform.local.scaling;
            if (characterPosition.x - (characterScaling.x / 2) < colissionObjectPosition.x + (colissionObjectScaling.x / 2) &&
                characterPosition.x + (characterScaling.x / 2) > colissionObjectPosition.x - (colissionObjectScaling.x / 2) &&
                characterPosition.y - (characterScaling.y / 2) < colissionObjectPosition.y + (colissionObjectScaling.y / 2) &&
                characterPosition.y + (characterScaling.y / 2) > colissionObjectPosition.y - (colissionObjectScaling.y / 2)) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    Hitbox.mesh = new fudge.MeshQuad;
    Game.Hitbox = Hitbox;
})(Game || (Game = {}));
//# sourceMappingURL=Hitbox.js.map