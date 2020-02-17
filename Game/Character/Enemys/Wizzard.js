"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Wizzard extends Game.Character {
        constructor(name, spriteName, positionX, positionY, scaleX, scaleY) {
            super(name);
            this.attacksPlayer = false;
            this.teleportCooldown = 100;
            this.currentTeleportCooldown = 0;
            this.shotcount = 0;
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
            // let material: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 0, 1, 1)));
            // this.addComponent(new fudge.ComponentMaterial(material));
            this.setStats({ hp: 10, dmg: 0, walkSpeed: 2, jumpHeight: 0, attackSpeed: 100 });
            //this.movementDuration = Util.getInstance().getRandomRange(2, 3);
            //this.randomDirection();
            super.addSpriteListener();
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.behavior);
        }
        die() {
            this.showOneTime(Game.CHARACTERSTATE.DEATH);
            this.isDead = true;
            setTimeout(() => {
                this.getParent().removeChild(this);
                Game.Util.getInstance().level.deleteEnemy(this);
            }, 400);
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
                        this.currentTeleportCooldown = 0;
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
        setDirection() {
            switch (this.teleportDirection) {
                case Game.DIRECTION.LEFT: {
                    this.teleportDirection = Game.DIRECTION.RIGHT;
                    break;
                }
                case Game.DIRECTION.RIGHT: {
                    this.teleportDirection = Game.DIRECTION.LEFT;
                    break;
                }
            }
        }
        shoot() {
            this.showOneTime(Game.CHARACTERSTATE.ATTACK);
            let spells = new Game.WizzardSpell("spell" + this.shotcount, Game.ENVIRONMENTTYPE.PLATFORM, "spell", this.cmpTransform.local.translation.x, this.cmpTransform.local.translation.y - 0.3, 0.5, 0.5);
            spells.shotdirection = this.teleportDirection;
            Game.Util.getInstance().level.addWizardSpell(spells);
            this.shotcount++;
        }
        teleport(direction) {
            let posX = this.cmpTransform.local.translation.x;
            let posY = this.cmpTransform.local.translation.y;
            switch (direction) {
                case Game.DIRECTION.LEFT: {
                    this.look(this.teleportDirection);
                    this.cmpTransform.local.translation = new fudge.Vector3(posX - 5, posY + 0.5, 0);
                    this.setDirection();
                    this.shoot();
                    break;
                }
                case Game.DIRECTION.RIGHT: {
                    this.look(this.teleportDirection);
                    this.cmpTransform.local.translation = new fudge.Vector3(posX + 5, posY + 0.5, 0);
                    this.setDirection();
                    this.shoot();
                    break;
                }
            }
        }
    }
    Game.Wizzard = Wizzard;
})(Game || (Game = {}));
//# sourceMappingURL=Wizzard.js.map