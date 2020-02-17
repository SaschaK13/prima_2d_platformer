"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Wizzard extends Game.Character {
        constructor(name, spriteName, positionX, positionY, scaleX, scaleY) {
            super(name);
            this.attacksPlayer = false;
            this.teleportCooldown = 150;
            this.currentTeleportCooldown = 0;
            this.dropChance = 0.4;
            this.teleportDirection = Game.DIRECTION.LEFT;
            this.behavior = (_event) => {
                if (!this.isDead && this.isLoaded) {
                    this.ki();
                }
            };
            this.name = name;
            this.spriteName = spriteName;
            this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
            this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);
            let material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 0, 1, 1)));
            this.addComponent(new fudge.ComponentMaterial(material));
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
            let player = Game.Util.getInstance().level.player;
            if (this.currentPlatform && player.currentPlatform) {
                if (this.currentPlatform.name == player.currentPlatform.name) {
                    if (this.currentTeleportCooldown == this.teleportCooldown) {
                        this.teleport(this.teleportDirection);
                    }
                    else {
                        this.currentTeleportCooldown++;
                    }
                }
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
                this.teleportDirection = Game.DIRECTION.RIGHT;
            }
            else {
                this.teleportDirection = Game.DIRECTION.LEFT;
            }
        }
        shoot() {
        }
        teleport(direction) {
            switch (direction) {
                case Game.DIRECTION.LEFT: {
                    this.cmpTransform.local.translateX(-10);
                    break;
                }
                case Game.DIRECTION.RIGHT: {
                    this.cmpTransform.local.translateX(+10);
                    break;
                }
            }
            this.randomDirection();
            this.shoot();
        }
    }
    Game.Wizzard = Wizzard;
})(Game || (Game = {}));
//# sourceMappingURL=Wizzard.js.map