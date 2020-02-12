"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    let CHARACTERSTATE;
    (function (CHARACTERSTATE) {
        CHARACTERSTATE["DEFAULT"] = "default";
        CHARACTERSTATE["IDLE"] = "idle";
        CHARACTERSTATE["WALK"] = "walk";
        CHARACTERSTATE["JUMP"] = "jump";
        CHARACTERSTATE["ATTACK"] = "attack";
        CHARACTERSTATE["DEATH"] = "death";
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
            this.DMG = 1;
            this.HP = 5;
            this.ATTACKSPEED = 50;
            this.dmgCooldown = 50;
            this.currentDmgCooldown = 0;
            this.attackCooldown = 0;
            this.gravity = -8;
            this.velocity = new fudge.Vector2(0, 0);
            this.currentSpriteCooldown = 0;
            this.ANIMATION_COOLDOWN = 4;
            this.showAttackAnimation = false;
            this.attackAnimationCounter = 0;
            this.showDeathAnimation = false;
            this.deathAnimationCounter = 0;
            this.direction = DIRECTION.RIGHT;
            this.isJumping = false;
            this.isDead = false;
            /*public getCurrentPlatform(): Platform {
        
              let collisionObjects = this.collider.getCollisionObjects();
              for(var i = 0; i < collisionObjects.length; i++ )
              {
                let collisionObject: CollidedObject = collisionObjects[i];
        
                if(collisionObject.object.constructor.name == "Platform")
                {
                  return collisionObject.object as Platform;
                }
              }
        
              return null;
            }
            */
            this.update = (_event) => {
                this.updateSprites();
                this.collider.handleCollsion();
                this.handlePhysics();
                if (this.attackCooldown != 0) {
                    this.attackCooldown -= 1;
                }
                if (this.currentDmgCooldown != 0) {
                    this.currentDmgCooldown -= 1;
                }
            };
            this.mesh = new fudge.MeshQuad();
            this.cmpMesh = new fudge.ComponentMesh(this.mesh);
            this.addComponent(this.cmpMesh);
            this.cmpTrans = new fudge.ComponentTransform();
            this.addComponent(this.cmpTrans);
            this.collider = new Game.Collider(this);
            this.hitbox = new Game.Hitbox(nodeName + "_Hitbox", this, new fudge.Vector2(this.cmpTransform.local.scaling.x / 2, this.cmpTransform.local.scaling.y));
            // this.show(CHARACTERSTATE.IDLE);
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
                this.handleSolidColision(collisionObject);
            }
        }
        handleSolidColision(collidedObject) {
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
                    break;
                }
                case Game.CollisionDirection.LEFT: {
                    let newXPosition = collisionObject.cmpTransform.local.translation.x + (collisionObject.cmpTransform.local.scaling.x / 2) + (this.cmpTransform.local.scaling.x / 2);
                    translation.x = newXPosition;
                    this.cmpTransform.local.translation = translation;
                    this.velocity.x = 0;
                    break;
                }
                case Game.CollisionDirection.RIGHT: {
                    let newXPosition = collisionObject.cmpTransform.local.translation.x - (collisionObject.cmpTransform.local.scaling.x / 2) - (this.cmpTransform.local.scaling.x / 2);
                    translation.x = newXPosition;
                    this.cmpTransform.local.translation = translation;
                    this.velocity.x = 0;
                    break;
                }
            }
        }
        show(_characterstate) {
            for (let child of this.getChildren()) {
                child.activate(child.name == (this.spriteName + "_" + _characterstate));
            }
        }
        showOneTime(_characterstate) {
            this.showAttackAnimation = true;
            this.showDeathAnimation = true;
            this.show(_characterstate);
        }
        idle() {
            if (!this.isJumping && !this.isDead) {
                this.show(CHARACTERSTATE.IDLE);
            }
        }
        jump() {
            if (!this.isJumping) {
                this.isJumping = true;
                this.velocity.y += this.JUMP_HEIGHT;
                this.show(CHARACTERSTATE.JUMP);
            }
        }
        walk(direction) {
            let timeFrame = fudge.Loop.timeFrameGame / 1000;
            if (direction == DIRECTION.RIGHT) {
                this.cmpTransform.local.translateX(this.WALK_SPEED * timeFrame);
                if (this.direction != direction) {
                    this.cmpTransform.local.rotation = fudge.Vector3.Y(0);
                }
                this.direction = direction;
            }
            else {
                this.cmpTransform.local.translateX(-(this.WALK_SPEED * timeFrame));
                if (this.direction != direction) {
                    this.cmpTransform.local.rotation = fudge.Vector3.Y(180);
                }
                this.direction = direction;
            }
            if (!this.isJumping) {
                this.show(CHARACTERSTATE.WALK);
            }
        }
        attack() { }
        die() {
            this.isDead = true;
            this.showOneTime(CHARACTERSTATE.DEATH);
        }
        takeDmg(dmgTaken) {
            if (this.currentDmgCooldown == 0) {
                if (this.HP > 0) {
                    if ((this.HP - dmgTaken) >= 0) {
                        this.HP -= dmgTaken;
                    }
                }
                else {
                    if (!this.isDead) {
                        this.die();
                    }
                }
                this.currentDmgCooldown = this.dmgCooldown;
            }
        }
        addSpriteListener() {
            for (let key of Game.Util.getInstance().spritesMap.get(this.spriteName).keys()) {
                let sprite = Game.Util.getInstance().spritesMap.get(this.spriteName).get(key);
                let nodeSprite = new Game.NodeSprite(sprite.name, sprite);
                if (sprite.name == "player_attack") {
                    this.attackSpriteLength = sprite.frames.length;
                    nodeSprite.addEventListener("showNextAttack", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                }
                else if (sprite.name == "player_death") {
                    this.deathSpriteLength = sprite.frames.length - 1;
                    nodeSprite.addEventListener("showNextDeath", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                }
                else {
                    nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                }
                nodeSprite.activate(false);
                this.appendChild(nodeSprite);
            }
            this.show(CHARACTERSTATE.IDLE);
        }
        getStats() {
            return { hp: this.HP, dmg: this.DMG, jump_height: this.JUMP_HEIGHT, walk_speed: this.WALK_SPEED, attackspeed: this.ATTACKSPEED };
        }
        setStat(stats) {
            this.HP = stats.hp;
            this.JUMP_HEIGHT = stats.jump_height;
            this.DMG = stats.dmg;
            this.WALK_SPEED = stats.walk_speed;
        }
        updateSprites() {
            if (this.currentSpriteCooldown != 0) {
                this.currentSpriteCooldown--;
            }
            else {
                this.broadcastEvent(new CustomEvent("showNext"));
                //fudge.Debug.log(this.attackAnimationCounter + " + " + this.attackSpriteLength);
                if (this.showAttackAnimation && this.attackAnimationCounter != this.attackSpriteLength) {
                    this.broadcastEvent(new CustomEvent("showNextAttack"));
                    this.attackAnimationCounter++;
                }
                else if (this.attackAnimationCounter == this.attackSpriteLength) {
                    this.attackAnimationCounter = 0;
                    this.showAttackAnimation = false;
                }
                if (this.showDeathAnimation && this.deathAnimationCounter != this.deathSpriteLength) {
                    this.broadcastEvent(new CustomEvent("showNextDeath"));
                    this.deathAnimationCounter++;
                }
                else if (this.deathAnimationCounter == this.deathSpriteLength) {
                    this.deathAnimationCounter = 0;
                    this.showDeathAnimation = false;
                }
                this.currentSpriteCooldown = this.ANIMATION_COOLDOWN;
            }
        }
    }
    Game.Character = Character;
})(Game || (Game = {}));
//# sourceMappingURL=Character.js.map