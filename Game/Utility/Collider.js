"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Collider {
        constructor(node) {
            this.object = node;
        }
        handleCollsion() {
            let objects = Game.Util.getInstance().getCollidableObjects();
            this.collissionObjects = [];
            for (var i = 0; i < objects.length; i++) {
                let node = objects[i];
                if (node.name != this.object.name) {
                    this.collideWith(node);
                }
            }
        }
        getCollisionObjects() {
            return this.collissionObjects;
        }
        collideWith(colissionObject) {
            let colissionObjectPosition = colissionObject.cmpTransform.local.translation;
            let colissionObjectScaling = colissionObject.getComponent(fudge.ComponentMesh).pivot.scaling;
            let characterPosition = this.object.cmpTransform.local.translation;
            let characterScaling = this.object.getComponent(fudge.ComponentMesh).pivot.scaling;
            if (characterPosition.x - (characterScaling.x / 2) < colissionObjectPosition.x + (colissionObjectScaling.x / 2) &&
                characterPosition.x + (characterScaling.x / 2) > colissionObjectPosition.x - (colissionObjectScaling.x / 2) &&
                characterPosition.y - (characterScaling.y / 2) < colissionObjectPosition.y + (colissionObjectScaling.y / 2) &&
                characterPosition.y + (characterScaling.y / 2) > colissionObjectPosition.y - (colissionObjectScaling.y / 2)) {
                this.isColliding = true;
                this.collissionObjects.push(colissionObject);
            }
            else {
                this.isColliding = false;
            }
        }
    }
    Game.Collider = Collider;
})(Game || (Game = {}));
//# sourceMappingURL=Collider.js.map