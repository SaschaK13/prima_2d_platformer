"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Goblin extends Game.Character {
        constructor(name, spriteName, positionX, positionY, scaleX, scaleY) {
            super(name);
            this.lookAroundCooldown = 50;
            this.currentLookAroundCooldown = 0;
            this.moveDirection = Game.DIRECTION.RIGHT;
            this.behavior = (_event) => {
                this.ki();
            };
            this.name = name;
            this.spriteName = spriteName;
            this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
            this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);
            this.setStat({ hp: 3, dmg: 0, walk_speed: 2, jump_height: 0, attackspeed: 0 });
            //this.movementDuration = Util.getInstance().getRandomRange(2, 3);
            //this.randomDirection();
            super.addSpriteListener();
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.behavior);
        }
        die() {
            this.getParent().removeChild(this);
            Game.Util.getInstance().level.deleteEnemy(this);
        }
        ki() {
            //Check if player is on same height
            let player = Game.Util.getInstance().level.player;
            let playerTrans = Game.Util.getInstance().level.player.cmpTransform.local.translation;
            let goblinTrans = this.cmpTransform.local.translation;
            if (goblinTrans.y <= playerTrans.y + 1 && goblinTrans.y >= playerTrans.y - 1) {
                //Same height
                if (this.currentPlatform && player.currentPlatform) {
                    if (this.currentPlatform.name == player.currentPlatform.name) {
                        //Same platform
                        if (playerTrans.x < goblinTrans.x) {
                            //Player is LeftB
                            this.walk(Game.DIRECTION.LEFT);
                        }
                        else {
                            //Player is Right
                            this.walk(Game.DIRECTION.RIGHT);
                        }
                    }
                }
            }
            else {
                this.lookAround();
            }
        }
        lookAround() {
            if (this.currentLookAroundCooldown == this.lookAroundCooldown) {
                this.randomDirection();
                this.look(this.moveDirection);
                this.currentLookAroundCooldown = 0;
            }
            else {
                this.currentLookAroundCooldown++;
            }
        }
        reactToCollison() {
            let collisionObjects = this.collider.getCollisionObjects();
            for (var i = 0; i < collisionObjects.length; i++) {
                let collisionObject = collisionObjects[i];
                switch (collisionObject.collisionType) {
                    case Game.CollisionType.ENEMY: {
                        break;
                    }
                    case Game.CollisionType.ENVIRONMENT: {
                        if (collisionObject.object.constructor.name == "Platform") {
                            this.currentPlatform = collisionObject.object;
                        }
                        this.handleSolidColision(collisionObject);
                        break;
                    }
                    case Game.CollisionType.PLAYER: {
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
    Game.Goblin = Goblin;
})(Game || (Game = {}));
//# sourceMappingURL=Goblin.js.map