"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Goblin extends Game.Character {
        constructor(name, spriteName, positionX, positionY, scaleX, scaleY) {
            super(name);
            this.attacksPlayer = false;
            this.dropChance = 0.4;
            this.lookAroundCooldown = 50;
            this.currentLookAroundCooldown = 0;
            this.moveDirection = Game.DIRECTION.RIGHT;
            this.behavior = (_event) => {
                if (!this.isDead && this.isLoaded) {
                    this.ki();
                }
            };
            this.name = name;
            this.spriteName = spriteName;
            this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
            this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);
            this.setStats({ hp: 3, dmg: 0, walkSpeed: 2, jumpHeight: 0, attackSpeed: 100 });
            //this.movementDuration = Util.getInstance().getRandomRange(2, 3);
            //this.randomDirection();
            super.addSpriteListener();
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.behavior);
        }
        die() {
            if (Math.random() < this.dropChance) {
                this.dropItem();
            }
            this.showOneTime(Game.CHARACTERSTATE.DEATH);
            this.isDead = true;
            setTimeout(() => {
                this.getParent().removeChild(this);
                Game.Util.getInstance().level.deleteEnemy(this);
            }, 200);
        }
        dropItem() {
            let possibleItemsArray = Game.Util.getInstance().level.possibleItemsArray;
            let randomItem = Game.Util.getInstance().getRandomRange(0, possibleItemsArray.length);
            let item = possibleItemsArray[randomItem];
            item.cmpTransform.local.translation = this.cmpTransform.local.translation;
            item.cmpTransform.local.scaling = new fudge.Vector3(this.cmpTransform.local.scaling.x / 1.5, this.cmpTransform.local.scaling.y / 1.5, 0);
            Game.Util.getInstance().level.appendToRoot(item);
            Game.Util.getInstance().level.itemArray.push(item);
        }
        attack() {
            if (this.attackCooldown == 0 && !Game.Util.getInstance().level.player.finished) {
                Game.Util.getInstance().level.player.takeDmg(1);
                this.attacksPlayer = true;
                this.isAttacking = true;
                this.showOneTime(Game.CHARACTERSTATE.ATTACK);
                this.attackCooldown = this.getStats().attackSpeed;
            }
        }
        ki() {
            //Check if player is on same height
            let player = Game.Util.getInstance().level.player;
            let playerTrans = Game.Util.getInstance().level.player.cmpTransform.local.translation;
            let goblinTrans = this.cmpTransform.local.translation;
            let collisionObjects = this.hitbox.detectEnemys();
            if (collisionObjects.length != 0 && !player.isDead) {
                this.attack();
            }
            else {
                this.attacksPlayer = false;
            }
            if (goblinTrans.y <= playerTrans.y + 0.7 && goblinTrans.y >= playerTrans.y - 0.7) {
                //Same height
                if (this.currentPlatform && player.currentPlatform) {
                    if (this.currentPlatform.name == player.currentPlatform.name && !this.attacksPlayer) {
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
                this.show(Game.CHARACTERSTATE.IDLE);
                this.lookAround();
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