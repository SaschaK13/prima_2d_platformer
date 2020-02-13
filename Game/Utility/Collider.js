"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    let CollisionType;
    (function (CollisionType) {
        CollisionType["ENVIRONMENT"] = "Platform";
        CollisionType["CHARACTER"] = "Character";
        CollisionType["ITEM"] = "Item";
        CollisionType["MISSING"] = "Missing";
    })(CollisionType = Game.CollisionType || (Game.CollisionType = {}));
    let CollisionDirection;
    (function (CollisionDirection) {
        CollisionDirection["RIGHT"] = "Right";
        CollisionDirection["LEFT"] = "Left";
        CollisionDirection["TOP"] = "Top";
        CollisionDirection["BOTTOM"] = "Bottom";
        CollisionDirection["ERROR"] = "Error";
    })(CollisionDirection = Game.CollisionDirection || (Game.CollisionDirection = {}));
    class Collider {
        constructor(node) {
            this.object = node;
        }
        handleCollsion() {
            let objects = Game.Util.getInstance().level.getCollidableObjects();
            this.oldCollisionObjects = this.collissionObjects;
            this.collissionObjects = [];
            for (var i = 0; i < objects.length; i++) {
                let node = objects[i];
                if (node.name != this.object.name) {
                    this.collideWith(node);
                }
            }
            this.updateCollisionObjects();
            fudge.Debug.log(objects);
        }
        getCollisionObjects() {
            return this.collissionObjects;
        }
        getCollisionType(colissionObject) {
            if (colissionObject.constructor.name == "Platform") {
                return CollisionType.ENVIRONMENT;
            }
            else if (colissionObject.constructor.name == "Blob" || colissionObject.constructor.name == "Player") {
                return CollisionType.CHARACTER;
            }
            else if (colissionObject.constructor.name == "Item") {
                return CollisionType.ITEM;
            }
            else {
                return CollisionType.MISSING;
            }
        }
        getCollisionDirection(colissionObject) {
            let objectLeft = this.object.cmpTransform.local.translation.x - (this.object.cmpTransform.local.scaling.x / 2);
            let objectRight = this.object.cmpTransform.local.translation.x + (this.object.cmpTransform.local.scaling.x / 2);
            let objectTop = this.object.cmpTransform.local.translation.y - (this.object.cmpTransform.local.scaling.y / 2);
            let objectBottom = this.object.cmpTransform.local.translation.y + (this.object.cmpTransform.local.scaling.y / 2);
            let objectOldLeft = this.object.oldTransform.x - (this.object.cmpTransform.local.scaling.x / 2);
            let objectOldRight = this.object.oldTransform.x + (this.object.cmpTransform.local.scaling.x / 2);
            let objectOldTop = this.object.oldTransform.y - (this.object.cmpTransform.local.scaling.y / 2);
            let objectOldBottom = this.object.oldTransform.y + (this.object.cmpTransform.local.scaling.y / 2);
            let collissionObjectLeft = colissionObject.cmpTransform.local.translation.x - (colissionObject.cmpTransform.local.scaling.x / 2);
            let collissionObjectRight = colissionObject.cmpTransform.local.translation.x + (colissionObject.cmpTransform.local.scaling.x / 2);
            let collissionObjectTop = colissionObject.cmpTransform.local.translation.y - (colissionObject.cmpTransform.local.scaling.y / 2);
            let collissionObjectBottom = colissionObject.cmpTransform.local.translation.y + (colissionObject.cmpTransform.local.scaling.y / 2);
            if (objectOldBottom <= collissionObjectTop && objectBottom >= collissionObjectTop)
                return CollisionDirection.TOP;
            if (objectOldTop >= collissionObjectBottom && objectTop <= collissionObjectBottom)
                return CollisionDirection.BOTTOM;
            if (objectOldRight <= collissionObjectLeft && objectRight >= collissionObjectLeft)
                return CollisionDirection.RIGHT;
            if (objectOldLeft >= collissionObjectRight && objectLeft <= collissionObjectRight)
                return CollisionDirection.LEFT;
            return CollisionDirection.ERROR;
        }
        collideWith(cObject) {
            let colissionObjectPosition = cObject.cmpTransform.local.translation;
            let colissionObjectScaling = cObject.cmpTransform.local.scaling;
            let characterPosition = this.object.cmpTransform.local.translation;
            let characterScaling = this.object.cmpTransform.local.scaling;
            if (characterPosition.x - (characterScaling.x / 2) < colissionObjectPosition.x + (colissionObjectScaling.x / 2) &&
                characterPosition.x + (characterScaling.x / 2) > colissionObjectPosition.x - (colissionObjectScaling.x / 2) &&
                characterPosition.y - (characterScaling.y / 2) < colissionObjectPosition.y + (colissionObjectScaling.y / 2) &&
                characterPosition.y + (characterScaling.y / 2) > colissionObjectPosition.y - (colissionObjectScaling.y / 2)) {
                this.isColliding = true;
                let direction = this.getCollisionDirection(cObject);
                let collisionType = this.getCollisionType(cObject);
                this.collissionObjects.push({ object: cObject, collisionDirecton: direction, collisionType: collisionType });
            }
            else {
                this.isColliding = false;
            }
        }
        updateCollisionObjects() {
            for (var i = 0; i < this.oldCollisionObjects.length; i++) {
                let oldObject = this.oldCollisionObjects[i];
                for (var j = 0; j < this.collissionObjects.length; j++) {
                    let newObject = this.collissionObjects[j];
                    if (oldObject.object.name == newObject.object.name) {
                        if (newObject.collisionDirecton == CollisionDirection.ERROR) {
                            newObject.collisionDirecton = oldObject.collisionDirecton;
                        }
                    }
                }
            }
        }
    }
    Game.Collider = Collider;
})(Game || (Game = {}));
//# sourceMappingURL=Collider.js.map