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
            this.JUMP_HEIGHT = 6;
            this.WALK_SPEED = 2;
            this.gravity = -8;
            this.velocity = new fudge.Vector2(0, 0);
            this.spriteNameMap = {};
            this.isJumping = false;
            this.mesh = new fudge.MeshQuad();
            this.cmpMesh = new fudge.ComponentMesh(this.mesh);
            this.addComponent(this.cmpMesh);
            this.cmpTrans = new fudge.ComponentTransform();
            this.addComponent(this.cmpTrans);
            this.collider = new Game.Collider(this);
            this.textureImage = Game.Util.getInstance().getTextureImageByName(nodeName);
            this.generateSprites();
            this.fillSpriteMap();
            this.show(CHARACTERSTATE.IDLE);
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        handlePhysics() {
            this.handleVelocity();
            this.reactToCollison();
        }
        handleVelocity() {
            this.oldTransform = this.cmpTransform.local.translation;
            let timeFrame = fudge.Loop.timeFrameGame / 1000;
            this.velocity.y += this.gravity * timeFrame;
            //ad velocity to position
            this.cmpTransform.local.translateY(this.velocity.y * timeFrame);
            this.cmpTransform.local.translateX(this.velocity.x * timeFrame);
        }
        reactToCollison() {
            let collisionObjects = this.collider.getCollisionObjects();
            for (var i = 0; i < collisionObjects.length; i++) {
                let collisionObject = collisionObjects[i];
                switch (collisionObject.object.type) {
                    case Game.EnvironmentType.PLATFORM: {
                        this.handlePlatformColission(collisionObject);
                    }
                }
            }
        }
        handlePlatformColission(collidedObject) {
            let collisionObject = collidedObject.object;
            let translation = this.cmpTransform.local.translation;
            switch (collidedObject.collisionDirecton) {
                case Game.CollisionDirection.BOTTOM: {
                    let newYPosition = collisionObject.cmpTransform.local.translation.y + (collisionObject.cmpTransform.local.scaling.y / 2) + (this.cmpTransform.local.scaling.y / 2);
                    translation.y = newYPosition;
                    this.cmpTransform.local.translation = translation;
                    this.velocity.y = 0;
                    this.isJumping = false;
                    break;
                }
                case Game.CollisionDirection.TOP: {
                    let newYPosition = collisionObject.cmpTransform.local.translation.y - (collisionObject.cmpTransform.local.scaling.y / 2) - (this.cmpTransform.local.scaling.y / 2);
                    translation.y = newYPosition;
                    this.cmpTransform.local.translation = translation;
                    this.velocity.y = 0;
                    this.isJumping = false;
                    break;
                }
                case Game.CollisionDirection.LEFT: {
                    let newXPosition = collisionObject.cmpTransform.local.translation.x + (collisionObject.cmpTransform.local.scaling.x / 2) + (this.cmpTransform.local.scaling.x / 2);
                    translation.x = newXPosition;
                    this.cmpTransform.local.translation = translation;
                    this.velocity.x = 0;
                    this.isJumping = false;
                    break;
                }
                case Game.CollisionDirection.RIGHT: {
                    let newXPosition = collisionObject.cmpTransform.local.translation.x - (collisionObject.cmpTransform.local.scaling.x / 2) - (this.cmpTransform.local.scaling.x / 2);
                    translation.x = newXPosition;
                    this.cmpTransform.local.translation = translation;
                    this.velocity.x = 0;
                    this.isJumping = false;
                    break;
                }
            }
        }
        generateSprites() {
            this.appendChild(nodeSprite);
        }
    }
    Game.Character = Character;
    jump();
    void {
        : .isJumping
    };
    {
        this.isJumping = true;
        this.velocity.y += this.JUMP_HEIGHT;
        this.show(CHARACTERSTATE.JUMP);
    }
})(Game || (Game = {}));
walk(direction, DIRECTION);
void {
    let, timeFrame: number = fudge.Loop.timeFrameGame / 1000,
    this: .show(CHARACTERSTATE.WALK),
    if(direction) { }
} == DIRECTION.RIGHT;
{
    this.cmpTransform.local.translateX(this.WALK_SPEED * timeFrame);
}
{
    this.cmpTransform.local.translateX(-(this.WALK_SPEED * timeFrame));
}
handleCharacterStates(_characterstate, CHARACTERSTATE, _direction ?  : DIRECTION);
void {
    switch(_characterstate) {
    },
    case: CHARACTERSTATE.IDLE,
    break: ,
    case: CHARACTERSTATE.WALK,
    break: ,
    case: CHARACTERSTATE.JUMP,
    break: 
};
this.show(_characterstate);
update = (_event) => {
    this.broadcastEvent(new CustomEvent("showNext"));
    this.collider.handleCollsion();
    this.handlePhysics();
};
//# sourceMappingURL=Character.js.map