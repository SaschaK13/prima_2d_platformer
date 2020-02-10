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
    let DIRECTION;
    (function (DIRECTION) {
        DIRECTION["RIGHT"] = "right";
        DIRECTION["LEFT"] = "left";
    })(DIRECTION = Game.DIRECTION || (Game.DIRECTION = {}));
    class Character extends fudge.Node {
        constructor(nodeName) {
            super(nodeName);
            this.JUMP_HEIGHT = 4;
            this.WALK_SPEED = 1;
            this.gravity = -8;
            this.velocity = new fudge.Vector2(0, 0);
            this.spriteNameMap = {};
            this.isJumping = false;
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
            this.handleVelocity();
            this.handleStaying();
        }
        handleVelocity() {
            this.oldTransform = this.cmpTransform.local.translation;
            let timeFrame = fudge.Loop.timeFrameGame / 1000;
            this.velocity.y += this.gravity * timeFrame;
            //ad velocity to position
            this.cmpTransform.local.translateY(this.velocity.y * timeFrame);
            this.cmpTransform.local.translateX(this.velocity.x * timeFrame);
        }
        handleStaying() {
            let collisionObjects = this.collider.getCollisionObjects();
            for (var i = 0; i < collisionObjects.length; i++) {
                let collisionObject = collisionObjects[i].object;
                if (collisionObject.type == Game.EnvironmentType.PLATFORM) {
                    let translation = this.cmpTransform.local.translation;
                    let newYPosition = collisionObject.cmpTransform.local.translation.y + (collisionObject.cmpTransform.local.scaling.y / 2) + (this.cmpTransform.local.scaling.y / 2);
                    translation.y = newYPosition;
                    this.cmpTransform.local.translation = translation;
                    this.velocity.y = 0;
                    this.isJumping = false;
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
            }B
          }
      */
        jump() {
            if (!this.isJumping) {
                this.isJumping = true;
                this.velocity.y += this.JUMP_HEIGHT;
            }
        }
        walk(direction) {
            let timeFrame = fudge.Loop.timeFrameGame / 1000;
            if (direction == DIRECTION.RIGHT) {
                this.cmpTransform.local.translateX(this.WALK_SPEED * timeFrame);
            }
            else {
                this.cmpTransform.local.translateX(-(this.WALK_SPEED * timeFrame));
            }
        }
        handleCharacterStates() {
        }
    }
    Game.Character = Character;
})(Game || (Game = {}));
//# sourceMappingURL=Character.js.map