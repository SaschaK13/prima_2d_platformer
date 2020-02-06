"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    let CHARACTERSTATE;
    (function (CHARACTERSTATE) {
        CHARACTERSTATE["IDLE"] = "idle";
        CHARACTERSTATE["WALK"] = "walk";
        CHARACTERSTATE["JUMP"] = "jump";
    })(CHARACTERSTATE = Game.CHARACTERSTATE || (Game.CHARACTERSTATE = {}));
    let DIRECTIONENUM;
    (function (DIRECTIONENUM) {
        DIRECTIONENUM["RIGHT"] = "right";
        DIRECTIONENUM["LEFT"] = "left";
    })(DIRECTIONENUM = Game.DIRECTIONENUM || (Game.DIRECTIONENUM = {}));
    class Character extends fudge.Node {
        constructor(nodeName) {
            super(nodeName);
            this.speed = new fudge.Vector2(0, 0);
            this.gravitySpeed = 0;
            this.gravity = -0.8;
            this.isColliding = false;
            this.spriteNameMap = {};
            this.update = (_event) => {
                if (this.falling) {
                    let timeFrame = fudge.Loop.timeFrameGame / 1000;
                    this.gravitySpeed += this.gravity;
                    this.cmpTransform.local.translateY((this.speed.y + this.gravitySpeed) * timeFrame);
                }
                if (this.isColliding) {
                    this.gravitySpeed = 0;
                    this.falling = false;
                    // this.stand(this.positionBevorUpdate.y, this.positionAfterUpdate.y);
                    this.cheatStand();
                }
                else {
                    this.falling = true;
                    //test
                }
            };
            this.mesh = new fudge.MeshQuad();
            this.cmpMesh = new fudge.ComponentMesh(this.mesh);
            this.addComponent(this.cmpMesh);
            this.cmpTrans = new fudge.ComponentTransform();
            this.addComponent(this.cmpTrans);
        }
        collideWith(colissionObject) {
            let colissionObjectPosition = colissionObject.cmpTransform.local.translation;
            let colissionObjectScaling = colissionObject.getComponent(fudge.ComponentMesh).pivot.scaling;
            let characterPosition = this.cmpTransform.local.translation;
            let characterScaling = this.getComponent(fudge.ComponentMesh).pivot.scaling;
            if (characterPosition.x < colissionObjectPosition.x + colissionObjectScaling.x &&
                characterPosition.x + characterScaling.x > colissionObjectPosition.x &&
                characterPosition.y < colissionObjectPosition.y + colissionObjectScaling.y &&
                characterPosition.y + characterScaling.y > colissionObjectPosition.y) {
                this.isColliding = true;
                this.collissionObject = colissionObject;
                return true;
            }
            else {
                this.isColliding = false;
                return false;
            }
        }
        handlePhysics() {
        }
        generateSprites() {
        }
        cheatStand() {
            if (this.collideWith(this.collissionObject)) {
                this.cmpTransform.local.translation = new fudge.Vector3(this.cmpTransform.local.translation.x, this.collissionObject.cmpTransform.local.translation.y, 0);
                this.cmpTransform.local.translateY((this.collissionObject.cmpTransform.local.scaling.y / 2 + this.cmpTransform.local.scaling.y / 2));
            }
            else {
                //this.cmpTransform.local.translateY(-(this.cmpTransform.local.scaling.y)/2)
            }
        }
        jump() {
            //test
        }
        walk() {
        }
    }
    Game.Character = Character;
})(Game || (Game = {}));
//# sourceMappingURL=Character.js.map