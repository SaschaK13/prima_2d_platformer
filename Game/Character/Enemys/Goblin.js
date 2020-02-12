"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Goblin extends Game.Character {
        constructor(name, spriteName, positionX, positionY, scaleX, scaleY) {
            super(name);
            this.behavior = (_event) => {
                this.ki();
            };
            this.name = name;
            this.spriteName = spriteName;
            this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
            this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);
            let material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 1, 0, 1)));
            this.addComponent(new fudge.ComponentMaterial(material));
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
                fudge.Debug.log(playerTrans.y);
                fudge.Debug.log(goblinTrans.y);
                fudge.Debug.log("Not same height");
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
    }
    Game.Goblin = Goblin;
})(Game || (Game = {}));
//# sourceMappingURL=Goblin.js.map