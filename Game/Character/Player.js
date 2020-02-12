"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Player extends Game.Character {
        constructor(name, spriteName, positionX, positionY, scaleX, scaleY) {
            super(name);
            this.name = name;
            super.spriteName = spriteName;
            /* let material: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 0, 1, 1)));
             this.addComponent(new fudge.ComponentMaterial(material))*/
            this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
            this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);
            super.fillSpriteMap();
        }
        takeDmg(dmgTaken) {
            Game.Util.getInstance().gui.updateHealth(dmgTaken);
            super.takeDmg(dmgTaken);
        }
        attack() {
            if (this.attackCooldown == 0) {
                let detectedEnemys = this.hitbox.detectEnemys();
                for (var i = 0; i < detectedEnemys.length; i++) {
                    detectedEnemys[i].takeDmg(this.getStats().dmg);
                }
                this.attackCooldown = this.getStats().attackspeed;
            }
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
                        fudge.Debug.log("I collide");
                        let item = collisionObject.object;
                        fudge.Debug.log(this);
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