"use strict";
var Game;
(function (Game) {
    let COLLISIONTYPE;
    (function (COLLISIONTYPE) {
        COLLISIONTYPE["ENVIRONMENT"] = "Platform";
        COLLISIONTYPE["ENEMY"] = "Enemy";
        COLLISIONTYPE["PLAYER"] = "Player";
        COLLISIONTYPE["ITEM"] = "Item";
        COLLISIONTYPE["FINISH"] = "Finish";
        COLLISIONTYPE["MISSING"] = "Missing";
    })(COLLISIONTYPE = Game.COLLISIONTYPE || (Game.COLLISIONTYPE = {}));
    let COLLISIONDIRECTION;
    (function (COLLISIONDIRECTION) {
        COLLISIONDIRECTION["RIGHT"] = "Right";
        COLLISIONDIRECTION["LEFT"] = "Left";
        COLLISIONDIRECTION["TOP"] = "Top";
        COLLISIONDIRECTION["BOTTOM"] = "Bottom";
        COLLISIONDIRECTION["ERROR"] = "Error";
    })(COLLISIONDIRECTION = Game.COLLISIONDIRECTION || (Game.COLLISIONDIRECTION = {}));
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
        }
        getCollisionObjects() {
            return this.collissionObjects;
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
                return COLLISIONDIRECTION.TOP;
            if (objectOldTop >= collissionObjectBottom && objectTop <= collissionObjectBottom)
                return COLLISIONDIRECTION.BOTTOM;
            if (objectOldRight <= collissionObjectLeft && objectRight >= collissionObjectLeft)
                return COLLISIONDIRECTION.RIGHT;
            if (objectOldLeft >= collissionObjectRight && objectLeft <= collissionObjectRight)
                return COLLISIONDIRECTION.LEFT;
            return COLLISIONDIRECTION.ERROR;
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
                let direction = this.getCollisionDirection(cObject);
                let collisionType = this.getCollisionType(cObject);
                this.collissionObjects.push({ object: cObject, collisionDirecton: direction, collisionType: collisionType });
            }
        }
        updateCollisionObjects() {
            for (var i = 0; i < this.oldCollisionObjects.length; i++) {
                let oldObject = this.oldCollisionObjects[i];
                for (var j = 0; j < this.collissionObjects.length; j++) {
                    let newObject = this.collissionObjects[j];
                    if (oldObject.object.name == newObject.object.name) {
                        if (newObject.collisionDirecton == COLLISIONDIRECTION.ERROR) {
                            newObject.collisionDirecton = oldObject.collisionDirecton;
                        }
                    }
                }
            }
        }
        getCollisionType(colissionObject) {
            switch (colissionObject.constructor.name) {
                case "Platform": {
                    return COLLISIONTYPE.ENVIRONMENT;
                }
                case "Blob": {
                    return COLLISIONTYPE.ENEMY;
                }
                case "Wizzard": {
                    return COLLISIONTYPE.ENEMY;
                }
                case "Goblin": {
                    return COLLISIONTYPE.ENEMY;
                }
                case "Player": {
                    return COLLISIONTYPE.PLAYER;
                }
                case "Item": {
                    return COLLISIONTYPE.ITEM;
                }
                case "Finish": {
                    return COLLISIONTYPE.FINISH;
                }
            }
        }
    }
    Game.Collider = Collider;
})(Game || (Game = {}));
//# sourceMappingURL=Collider.js.map