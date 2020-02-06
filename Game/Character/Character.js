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
            this.gravity = -8;
            this.velocity = new fudge.Vector2(0, 0);
            this.spriteNameMap = {};
            this.update = (_event) => {
                this.collider.handleCollsion();
                this.handlePhysics();
            };
            this.mesh = new fudge.MeshQuad();
            this.cmpMesh = new fudge.ComponentMesh(this.mesh);
            this.addComponent(this.cmpMesh);
            this.cmpTrans = new fudge.ComponentTransform();
            this.addComponent(this.cmpTrans);
            this.collider = new Game.Collider(this);
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        handlePhysics() {
            this.handleGravity();
            this.handleStaying();
        }
        handleGravity() {
            let timeFrame = fudge.Loop.timeFrameGame / 1000;
            this.velocity.y += this.gravity * timeFrame;
            this.cmpTransform.local.translateY(this.velocity.y * timeFrame);
        }
        handleStaying() {
            let collisionObjects = this.collider.getCollisionObjects();
            for (var i = 0; i < collisionObjects.length; i++) {
                let collisionObject = collisionObjects[i];
                fudge.Debug.log(collisionObject.name);
                if (collisionObject.name == "boden1") {
                    fudge.Debug.log("detected plattform");
                    let translation = this.cmpTransform.local.translation;
                    let newYPosition = collisionObject.cmpTransform.local.translation.y + (collisionObject.cmpTransform.local.scaling.y / 2) + (this.cmpTransform.local.scaling.y / 2);
                    translation.y = newYPosition;
                    this.cmpTransform.local.translation = translation;
                    this.velocity.y = 0;
                }
            }
        }
        generateSprites() {
        }
        /*  private cheatStand()
          {
            if(this.collideWith(this.collissionObject) && this.collissionObject.name == "Platform") {
      
              this.cmpTransform.local.translation = new fudge.Vector3(this.cmpTransform.local.translation.x, this.collissionObject.cmpTransform.local.translation.y, 0 );
              this.cmpTransform.local.translateY((this.collissionObject.cmpTransform.local.scaling.y/2 + this.cmpTransform.local.scaling.y/2))
            } else {
              //this.cmpTransform.local.translateY(-(this.cmpTransform.local.scaling.y)/2)
            }
          }
      */
        jump() {
        }
        walk() {
        }
    }
    Game.Character = Character;
})(Game || (Game = {}));
//# sourceMappingURL=Character.js.map