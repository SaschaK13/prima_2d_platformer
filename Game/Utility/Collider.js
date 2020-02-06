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
            if (characterPosition.x < colissionObjectPosition.x + colissionObjectScaling.x &&
                characterPosition.x + characterScaling.x > colissionObjectPosition.x &&
                characterPosition.y < colissionObjectPosition.y + colissionObjectScaling.y &&
                characterPosition.y + characterScaling.y > colissionObjectPosition.y) {
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