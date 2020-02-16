"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Blob extends Game.Character {
        constructor(name, spriteName, positionX, positionY, scaleX, scaleY) {
            super(name);
            this.dropChance = 0.2;
            this.currentMovmentDuration = 0;
            this.behavior = (_event) => {
                if (!this.isDead) {
                    this.ki();
                }
            };
            this.name = name;
            this.spriteName = spriteName;
            this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
            this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);
            this.setStats({ hp: 3, dmg: 0, walkSpeed: 1, jumpHeight: 0, attackSpeed: 0 });
            this.movementDuration = Game.Util.getInstance().getRandomRange(2, 3);
            this.randomDirection();
            super.addSpriteListener();
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.behavior);
        }
        die() {
            if (Math.random() < this.dropChance) {
                this.dropItem();
            }
            this.isDead = true;
            this.isShowingOnetime = false;
            this.showOneTime(Game.CHARACTERSTATE.DEATH);
            setTimeout(() => {
                this.getParent().removeChild(this);
                Game.Util.getInstance().level.deleteEnemy(this);
            }, 500);
        }
        dropItem() {
            let possibleItemsArray = Game.Util.getInstance().level.possibleItemsArray;
            let randomItem = Game.Util.getInstance().getRandomRange(0, possibleItemsArray.length);
            let item = possibleItemsArray[randomItem];
            item.cmpTransform.local.translation = this.cmpTransform.local.translation;
            Game.Util.getInstance().level.appendToRoot(item);
            Game.Util.getInstance().level.itemArray.push(item);
        }
        ki() {
            if (this.currentMovmentDuration != this.movementDuration) {
                if (this.cmpTransform.local.translation.x >= this.currentPlatform.cmpTransform.local.translation.x - (this.currentPlatform.cmpTransform.local.scaling.x / 2) && this.cmpTransform.local.translation.x <= this.currentPlatform.cmpTransform.local.translation.x + (this.currentPlatform.cmpTransform.local.scaling.x / 2)) {
                    this.walk(this.moveDirection);
                }
                else {
                    switch (this.moveDirection) {
                        case Game.DIRECTION.LEFT: {
                            this.moveDirection = Game.DIRECTION.RIGHT;
                            this.walk(this.moveDirection);
                            break;
                        }
                        case Game.DIRECTION.RIGHT: {
                            this.moveDirection = Game.DIRECTION.LEFT;
                            this.walk(this.moveDirection);
                            break;
                        }
                    }
                    this.currentMovmentDuration++;
                }
            }
            else {
                this.movementDuration = Game.Util.getInstance().getRandomRange(100, 200);
                this.randomDirection();
                this.currentMovmentDuration = 0;
            }
        }
        reactToCollison() {
            let collisionObjects = this.collider.getCollisionObjects();
            for (var i = 0; i < collisionObjects.length; i++) {
                let collisionObject = collisionObjects[i];
                switch (collisionObject.collisionType) {
                    case Game.COLLISIONTYPE.ENEMY: {
                        break;
                    }
                    case Game.COLLISIONTYPE.ENVIRONMENT: {
                        if (collisionObject.object.constructor.name == "Platform") {
                            this.currentPlatform = collisionObject.object;
                        }
                        this.handleSolidColision(collisionObject);
                        break;
                    }
                    case Game.COLLISIONTYPE.PLAYER: {
                        this.handleSolidColision(collisionObject);
                        break;
                    }
                }
            }
        }
        randomDirection() {
            let randomnum = Game.Util.getInstance().getRandomRange(1, 3);
            if (randomnum == 1) {
                this.moveDirection = Game.DIRECTION.RIGHT;
            }
            else {
                this.moveDirection = Game.DIRECTION.LEFT;
            }
        }
    }
    Game.Blob = Blob;
})(Game || (Game = {}));
//# sourceMappingURL=Blob.js.map