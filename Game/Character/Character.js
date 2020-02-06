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
                fudge.Debug.log("Character Update");
                this.collider.handleCollsion();
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