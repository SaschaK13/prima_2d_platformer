"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Player extends Game.Character {
        constructor(name, spriteName, positionX, positionY, scaleX, scaleY) {
            super(name);
            this.name = name;
            super.spriteName = spriteName;
            this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
            this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);
            super.addSpriteListener();
        }
        takeDmg(dmgTaken) {
            if (this.getStats().hp >= 0) {
                Game.Util.getInstance().gui.updateHealth(this);
            }
            super.takeDmg(dmgTaken);
        }
        attack() {
            if (this.attackCooldown == 0) {
                let detectedEnemys = this.hitbox.detectEnemys();
                for (var i = 0; i < detectedEnemys.length; i++) {
                    detectedEnemys[i].takeDmg(this.getStats().dmg);
                }
                this.attackCooldown = this.getStats().attackSpeed;
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
                    case Game.CollisionType.CHARACTER: {
                        this.takeDmg(1);
                        super.handleSolidColision(collisionObject);
                        break;
                    }
                    case Game.CollisionType.ENVIRONMENT: {
                        super.handleSolidColision(collisionObject);
                        break;
                    }
                    case Game.CollisionType.ITEM: {
                        let item = collisionObject.object;
                        fudge.Debug.log(this + " collision with item " + item.getStats);
                        this.updateStats(item.getStats());
                        Game.Util.getInstance().level.deleteItem(item);
                        this.getParent().removeChild(item);
                        break;
                    }
                }
            }
        }
    }
    Game.Player = Player;
})(Game || (Game = {}));
//# sourceMappingURL=Player.js.map