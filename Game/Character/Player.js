"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Player extends Game.Character {
        constructor(name, spriteName, positionX, positionY, scaleX, scaleY) {
            super(name);
            this.finish = false;
            this.name = name;
            super.spriteName = spriteName;
            this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
            this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);
            super.addSpriteListener();
            this.playerStats = { hp: 10, walkSpeed: 2, jumpHeight: 6, dmg: 1, attackSpeed: 50 };
            this.setStats(this.playerStats);
        }
        takeDmg(dmgTaken) {
            if (this.currentDmgCooldown == 0) {
                Game.Util.getInstance().hurtSound.play();
                Game.Util.getInstance().gui.updateStats(this);
            }
            super.takeDmg(dmgTaken);
        }
        jump() {
            if (!this.isJumping) {
                Game.Util.getInstance().jumpSound.play();
            }
            super.jump();
        }
        attack() {
            if (this.attackCooldown == 0) {
                let detectedEnemys = this.hitbox.detectEnemys();
                for (var i = 0; i < detectedEnemys.length; i++) {
                    detectedEnemys[i].takeDmg(this.getStats().dmg);
                }
                this.isAttacking = true;
                this.showOneTime(Game.CHARACTERSTATE.ATTACK);
                this.attackCooldown = this.getStats().attackSpeed;
                Game.Util.getInstance().attackSound.play();
            }
        }
        die() {
            super.die();
        }
        reactToCollison() {
            let collisionObjects = this.collider.getCollisionObjects();
            for (var i = 0; i < collisionObjects.length; i++) {
                let collisionObject = collisionObjects[i];
                switch (collisionObject.collisionType) {
                    case Game.CollisionType.ENEMY: {
                        fudge.Debug.log("hitted by enemy");
                        if (collisionObject.object.constructor.name == "Blob" && !this.finish) {
                            this.takeDmg(1);
                        }
                        super.handleSolidColision(collisionObject);
                        break;
                    }
                    case Game.CollisionType.ENVIRONMENT: {
                        if (collisionObject.object.constructor.name == "Platform") {
                            this.currentPlatform = collisionObject.object;
                        }
                        super.handleSolidColision(collisionObject);
                        break;
                    }
                    case Game.CollisionType.FINISH: {
                        if (!this.finish) {
                            this.hittedFinish();
                        }
                        break;
                    }
                    case Game.CollisionType.ITEM: {
                        let item = collisionObject.object;
                        this.updateStats(item.getStats());
                        Game.Util.getInstance().level.deleteItem(item);
                        this.getParent().removeChild(item);
                        break;
                    }
                }
            }
        }
        hittedFinish() {
            this.finish = true;
            document.getElementById("safeGame").style.visibility = "visible";
        }
    }
    Game.Player = Player;
})(Game || (Game = {}));
//# sourceMappingURL=Player.js.map