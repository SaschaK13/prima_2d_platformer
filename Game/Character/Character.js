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
        CHARACTERSTATE["HIT"] = "hit";
    })(CHARACTERSTATE = Game.CHARACTERSTATE || (Game.CHARACTERSTATE = {}));
    let DIRECTION;
    (function (DIRECTION) {
        DIRECTION["RIGHT"] = "right";
        DIRECTION["LEFT"] = "left";
    })(DIRECTION = Game.DIRECTION || (Game.DIRECTION = {}));
    class Character extends fudge.Node {
        constructor(nodeName) {
            super(nodeName);
            this.currentDmgCooldown = 0;
            this.attackCooldown = 0;
            this.direction = DIRECTION.RIGHT;
            this.isHitted = false;
            this.isJumping = false;
            this.isDead = false;
            this.isAttacking = false;
            this.isLoaded = false;
            this.isShowingOnetime = false;
            this.DMG_COOLDOWN = 50;
            this.ANIMATION_COOLDOWN = 4;
            this.currentShowOnetimeCounter = 0;
            this.currentAnimationCooldown = 0;
            this.gravity = -8;
            this.velocity = new fudge.Vector2(0, 0);
            this.update = (_event) => {
                if (this.isLoaded) {
                    this.updateSprites();
                    this.collider.handleCollsion();
                    this.handlePhysics();
                    if (this.attackCooldown != 0) {
                        this.attackCooldown -= 1;
                    }
                    if (this.currentDmgCooldown != 0) {
                        this.currentDmgCooldown -= 1;
                    }
                    else {
                        this.isHitted = false;
                    }
                }
            };
            this.mesh = new fudge.MeshQuad();
            this.cmpMesh = new fudge.ComponentMesh(this.mesh);
            this.addComponent(this.cmpMesh);
            this.cmpTrans = new fudge.ComponentTransform();
            this.addComponent(this.cmpTrans);
            this.collider = new Game.Collider(this);
            this.hitbox = new Game.Hitbox(nodeName + "_Hitbox", this, new fudge.Vector2(this.cmpTransform.local.scaling.x - 0.3, this.cmpTransform.local.scaling.y));
            // this.show(CHARACTERSTATE.IDLE);
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
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
                case Game.COLLISIONDIRECTION.BOTTOM: {
                    let newYPosition = collisionObject.cmpTransform.local.translation.y + (collisionObject.cmpTransform.local.scaling.y / 2) + (this.cmpTransform.local.scaling.y / 2);
                    translation.y = newYPosition;
                    this.cmpTransform.local.translation = translation;
                    this.isJumping = false;
                    this.velocity.y = 0;
                    break;
                }
                case Game.COLLISIONDIRECTION.TOP: {
                    let newYPosition = collisionObject.cmpTransform.local.translation.y - (collisionObject.cmpTransform.local.scaling.y / 2) - (this.cmpTransform.local.scaling.y / 2);
                    translation.y = newYPosition;
                    this.cmpTransform.local.translation = translation;
                    this.velocity.y = 0;
                    break;
                }
                case Game.COLLISIONDIRECTION.LEFT: {
                    let newXPosition = collisionObject.cmpTransform.local.translation.x + (collisionObject.cmpTransform.local.scaling.x / 2) + (this.cmpTransform.local.scaling.x / 2);
                    translation.x = newXPosition;
                    this.cmpTransform.local.translation = translation;
                    this.velocity.x = 0;
                    break;
                }
                case Game.COLLISIONDIRECTION.RIGHT: {
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
            if (!this.isDead) {
                //let spriteMap: Map<string, Sprite> = Util.getInstance().spritesMap.get(this.spriteName);
                //let nodeSprite: Sprite = spriteMap.get(_characterstate);
                //activates sprite
                for (let child of this.getChildren()) {
                    if (child.name == (this.spriteName + "_" + _characterstate)) {
                        child.activate(true);
                        this.isShowingOnetime = true;
                        this.showOnetimeCounter = child.getSprite().frames.length;
                        this.showOnetimeNodeSprite = child;
                        this.currentShowOnetimeCounter = 0;
                    }
                    else {
                        child.activate(false);
                    }
                }
            }
        }
        idle() {
            if (!this.isJumping && !this.isDead && !this.isAttacking && !this.isHitted && !this.isShowingOnetime) {
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
            if (!this.isDead) {
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
                if (!this.isJumping && !this.isHitted) {
                    this.show(CHARACTERSTATE.WALK);
                }
            }
        }
        attack() {
            //will be overwritten
        }
        die() {
            this.showOneTime(CHARACTERSTATE.DEATH);
            this.isDead = true;
            let util = Game.Util.getInstance();
            setTimeout(() => {
                util.gameOver();
                //this.isShowingOnetime = true;
            }, 750);
        }
        takeDmg(dmgTaken) {
            if (!this.isDead) {
                if (this.currentDmgCooldown == 0) {
                    if (this.HP > 0) {
                        if ((this.HP - dmgTaken) >= 0) {
                            this.HP -= dmgTaken;
                            this.isHitted = true;
                            this.showOneTime(CHARACTERSTATE.HIT);
                        }
                    }
                    else {
                        this.die();
                    }
                    this.currentDmgCooldown = this.DMG_COOLDOWN;
                }
            }
        }
        look(direction) {
            switch (direction) {
                case DIRECTION.RIGHT: {
                    this.cmpTransform.local.rotation = fudge.Vector3.Y(0);
                    this.direction = DIRECTION.RIGHT;
                    break;
                }
                case DIRECTION.LEFT: {
                    this.cmpTransform.local.rotation = fudge.Vector3.Y(180);
                    this.direction = DIRECTION.LEFT;
                    break;
                }
            }
        }
        addSpriteListener() {
            for (let key of Game.Util.getInstance().spritesMap.get(this.spriteName).keys()) {
                let sprite = Game.Util.getInstance().spritesMap.get(this.spriteName).get(key);
                let nodeSprite = new Game.NodeSprite(sprite.name, sprite);
                if (!(sprite.name == (this.spriteName + "_attack")) && !(sprite.name == (this.spriteName + "_death")) && !(sprite.name == (this.spriteName + "_hit"))) {
                    nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                }
                nodeSprite.activate(false);
                this.appendChild(nodeSprite);
            }
            this.show(CHARACTERSTATE.IDLE);
        }
        getStats() {
            return { hp: this.HP, dmg: this.DMG, jumpHeight: this.JUMP_HEIGHT, walkSpeed: this.WALK_SPEED, attackSpeed: this.ATTACK_SPEED };
        }
        setStats(stats) {
            this.HP = stats.hp;
            this.DMG = stats.dmg;
            this.JUMP_HEIGHT = stats.jumpHeight;
            this.WALK_SPEED = stats.walkSpeed;
            this.ATTACK_SPEED = stats.attackSpeed;
        }
        updateStats(stats) {
            this.HP += stats.hp;
            this.DMG += stats.dmg;
            this.JUMP_HEIGHT += stats.jumpHeight;
            this.WALK_SPEED += stats.walkSpeed;
            this.ATTACK_SPEED += stats.attackSpeed;
            Game.Util.getInstance().gui.updateStats(this);
        }
        handlePhysics() {
            this.handleVelocity();
            this.reactToCollison();
        }
        handleVelocity() {
            this.oldTransform = this.cmpTransform.local.translation;
            let timeFrame = fudge.Loop.timeFrameGame / 1000;
            //this.velocity.y += this.gravity * timeFram
            this.velocity.y += this.gravity * timeFrame;
            //ad velocity to position
            this.cmpTransform.local.translateY(this.velocity.y * timeFrame);
            this.cmpTransform.local.translateX(this.velocity.x * timeFrame);
        }
        updateSprites() {
            if (this.currentAnimationCooldown != 0) {
                this.currentAnimationCooldown--;
            }
            else {
                this.broadcastEvent(new CustomEvent("showNext"));
                if (this.isShowingOnetime) {
                    if (this.currentShowOnetimeCounter <= this.showOnetimeCounter) {
                        this.showOnetimeNodeSprite.showFrameNext();
                        this.currentShowOnetimeCounter++;
                    }
                    else {
                        if (this.showOnetimeNodeSprite) {
                            this.showOnetimeNodeSprite.resetFrames();
                            this.showOnetimeNodeSprite.activate(false);
                        }
                        this.isShowingOnetime = false;
                        this.isAttacking = false;
                        this.isHitted = false;
                        this.currentShowOnetimeCounter = 0;
                        if (this.isJumping) {
                            this.show(CHARACTERSTATE.JUMP);
                        }
                        else {
                            this.idle();
                        }
                    }
                }
                this.currentAnimationCooldown = this.ANIMATION_COOLDOWN;
            }
        }
    }
    Game.Character = Character;
})(Game || (Game = {}));
//# sourceMappingURL=Character.js.map