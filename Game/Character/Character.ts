namespace Game {

  import fudge = FudgeCore;

  export enum CHARACTERSTATE {
    DEFAULT = "default",
    IDLE = "idle",
    WALK = "walk",
    JUMP = "jump",
    ATTACK = "attack",
    DEATH = "death"
  }

  export enum DIRECTION {
    RIGHT = "right",
    LEFT = "left"
  }

  export interface SpriteName {
    [type: string]: string;
  }

  export interface CharacterStats {
    hp?: number;
    dmg?: number;
    jump_height?: number
    walk_speed?: number
    attackspeed?: number
  }

  export class Character extends fudge.Node {

    private JUMP_HEIGHT: number = 6;
    private WALK_SPEED: number = 2;
    private DMG: number = 1;
    private HP: number = 5;
    private ATTACKSPEED: number = 50;


    private dmgCooldown: number = 50;
    public currentDmgCooldown = 0;
    public attackCooldown = 0;

    private gravity: number = -8;
    private velocity: fudge.Vector2 = new fudge.Vector2(0, 0);

    private mesh: fudge.MeshQuad;
    private cmpTrans: fudge.ComponentTransform;
    private cmpMesh: fudge.ComponentMesh;

    private sprites: Sprite[];
    public spriteName: string;
    private currentSpriteCooldown: number = 0;
    private ANIMATION_COOLDOWN: number = 4;

    private attackSpriteLength: number;
    private showAttackAnimation: boolean = false;
    private attackAnimationCounter: number = 0;

    private deathSpriteLength: number;
    private showDeathAnimation: boolean = false;
    private deathAnimationCounter: number = 0;

    private state: CHARACTERSTATE;
    public direction: DIRECTION = DIRECTION.RIGHT;

    public collider: Collider;
    public hitbox: Hitbox;

    private isJumping: boolean = false;
    public isDead: boolean = false;
    public isAttacking = false;

    public oldTransform: fudge.Vector3;
    positionX: number;
    scaleX: number;
    positionY: number;

    public currentPlatform: Platform;


    constructor(nodeName: string) {
      super(nodeName);
      this.mesh = new fudge.MeshQuad();
      this.cmpMesh = new fudge.ComponentMesh(this.mesh);
      this.addComponent(this.cmpMesh);

      this.cmpTrans = new fudge.ComponentTransform();
      this.addComponent(this.cmpTrans);

      this.collider = new Collider(this);
      this.hitbox = new Hitbox(nodeName + "_Hitbox", this, new fudge.Vector2(this.cmpTransform.local.scaling.x / 2, this.cmpTransform.local.scaling.y));

      // this.show(CHARACTERSTATE.IDLE);
      fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.update);
    }

    public handlePhysics(): void {
      this.handleVelocity();
      this.reactToCollison();
    }

    public handleVelocity(): void {
      this.oldTransform = this.cmpTransform.local.translation;
      let timeFrame: number = fudge.Loop.timeFrameGame / 1000;
      this.velocity.y += this.gravity * timeFrame;

      //ad velocity to position
      this.cmpTransform.local.translateY(this.velocity.y * timeFrame);
      this.cmpTransform.local.translateX(this.velocity.x * timeFrame);
    }

    public reactToCollison(): void {
      let collisionObjects: CollidedObject[] = this.collider.getCollisionObjects();

      for (var i: number = 0; i < collisionObjects.length; i++) {
        let collisionObject = collisionObjects[i];
        this.handleSolidColision(collisionObject)

      }
    }

    public handleSolidColision(collidedObject: CollidedObject) {

      let collisionObject: fudge.Node = collidedObject.object as fudge.Node;
      let translation = this.cmpTransform.local.translation;
      switch (collidedObject.collisionDirecton) {
        case CollisionDirection.BOTTOM: {
          let newYPosition: number = collisionObject.cmpTransform.local.translation.y + (collisionObject.cmpTransform.local.scaling.y / 2) + (this.cmpTransform.local.scaling.y / 2);
          translation.y = newYPosition;
          this.cmpTransform.local.translation = translation;
          this.velocity.y = 0;
          this.isJumping = false;
          break;
        }

        case CollisionDirection.TOP: {
          let newYPosition: number = collisionObject.cmpTransform.local.translation.y - (collisionObject.cmpTransform.local.scaling.y / 2) - (this.cmpTransform.local.scaling.y / 2);
          translation.y = newYPosition;
          this.cmpTransform.local.translation = translation;
          this.velocity.y = 0;
          break;
        }

        case CollisionDirection.LEFT: {
          let newXPosition: number = collisionObject.cmpTransform.local.translation.x + (collisionObject.cmpTransform.local.scaling.x / 2) + (this.cmpTransform.local.scaling.x / 2);
          translation.x = newXPosition;
          this.cmpTransform.local.translation = translation;
          this.velocity.x = 0;
          break;
        }

        case CollisionDirection.RIGHT: {
          let newXPosition: number = collisionObject.cmpTransform.local.translation.x - (collisionObject.cmpTransform.local.scaling.x / 2) - (this.cmpTransform.local.scaling.x / 2);
          translation.x = newXPosition;
          this.cmpTransform.local.translation = translation;
          this.velocity.x = 0;
          break;
        }
      }
    }

    public show(_characterstate: CHARACTERSTATE): void {
      for (let child of this.getChildren()) {
        child.activate(child.name == (this.spriteName + "_" + _characterstate));
      }
    }

    public showOneTime(_characterstate: CHARACTERSTATE) {
      this.showAttackAnimation = true;
      this.showDeathAnimation = true;
      this.show(_characterstate);
    }

    public idle(): void {
      if (!this.isJumping && !this.isDead && !this.isAttacking) {
        this.show(CHARACTERSTATE.IDLE);
      }
    }

    public jump(): void {
      if (!this.isJumping) {
        this.isJumping = true;
        this.velocity.y += this.JUMP_HEIGHT;
        this.show(CHARACTERSTATE.JUMP);
      }
    }

    public walk(direction: DIRECTION) {
      let timeFrame = fudge.Loop.timeFrameGame / 1000;

      if (direction == DIRECTION.RIGHT) {
        this.cmpTransform.local.translateX(this.WALK_SPEED * timeFrame)
        if (this.direction != direction) {
          this.cmpTransform.local.rotation = fudge.Vector3.Y(0)
        }
        this.direction = direction;
      } else {
        this.cmpTransform.local.translateX(-(this.WALK_SPEED * timeFrame))
        if (this.direction != direction) {
          this.cmpTransform.local.rotation = fudge.Vector3.Y(180)
        }
        this.direction = direction;
      }

      if (!this.isJumping) {
        this.show(CHARACTERSTATE.WALK)

      }

    }

    public attack(): void {}

    public die(): void {
      this.isDead = true;
      this.showOneTime(CHARACTERSTATE.DEATH);
      
      let util: Util = Util.getInstance();
      setTimeout(() => { util.gameOver(); }, 1500);
    }

    public takeDmg(dmgTaken: number) {
      if (this.currentDmgCooldown == 0) {
        if (this.HP > 0) {
          if ((this.HP - dmgTaken) >= 0) {
            this.HP -= dmgTaken;
          }
        } else {
          if (!this.isDead) {
            this.die();
          }
        }
        this.currentDmgCooldown = this.dmgCooldown;
      }

    }

    public look(direction: DIRECTION)
    {
      switch(direction) {

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

    public addSpriteListener(): void {
      for (let key of Util.getInstance().spritesMap.get(this.spriteName).keys()) {       
        let sprite: Sprite = Util.getInstance().spritesMap.get(this.spriteName).get(key);
        let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
        if (sprite.name == "player_attack") {
          this.attackSpriteLength = sprite.frames.length;
          nodeSprite.addEventListener(
            "showNextAttack",
            (_event: Event) => { (<NodeSprite>_event.currentTarget).showFrameNext(); },
            true
          );
        } else if (sprite.name == "player_death") {
          this.deathSpriteLength = sprite.frames.length - 1;
          nodeSprite.addEventListener(
            "showNextDeath",
            (_event: Event) => { (<NodeSprite>_event.currentTarget).showFrameNext(); },
            true
          );
        } else {
          nodeSprite.addEventListener(
            "showNext",
            (_event: Event) => { (<NodeSprite>_event.currentTarget).showFrameNext(); },
            true
          );
        }
        nodeSprite.activate(false);        
  
        this.appendChild(nodeSprite);
      }
      this.show(CHARACTERSTATE.IDLE);
    }

   
    public getStats(): CharacterStats {
      return { hp: this.HP, dmg: this.DMG, jump_height: this.JUMP_HEIGHT, walk_speed: this.WALK_SPEED, attackspeed: this.ATTACKSPEED }
    }

    public setStat(stats: CharacterStats) {
      this.HP = stats.hp
      this.JUMP_HEIGHT = stats.jump_height
      this.DMG = stats.dmg
      this.WALK_SPEED = stats.walk_speed

    }

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

    private update = (_event: fudge.Eventƒ): void => {
      this.updateSprites();
      this.collider.handleCollsion();
      this.handlePhysics();
      if (this.attackCooldown != 0) {
        this.attackCooldown -= 1;
      }
      if (this.currentDmgCooldown != 0) {
        this.currentDmgCooldown -= 1;
      }
    }

    private updateSprites(): void {
      if (this.currentSpriteCooldown != 0) {
        this.currentSpriteCooldown --;
      } else {
        this.broadcastEvent(new CustomEvent("showNext"));
        //fudge.Debug.log(this.attackAnimationCounter + " + " + this.attackSpriteLength);
        if (this.showAttackAnimation && this.attackAnimationCounter != this.attackSpriteLength) {
          this.broadcastEvent(new CustomEvent("showNextAttack"));
          this.attackAnimationCounter++;
        } else if (this.attackAnimationCounter == this.attackSpriteLength) {
          this.attackAnimationCounter = 0;
          this.showAttackAnimation = false;
          this.isAttacking = false;
        }
        

        if (this.showDeathAnimation && this.deathAnimationCounter != this.deathSpriteLength) {
          this.broadcastEvent(new CustomEvent("showNextDeath"));
          this.deathAnimationCounter++;
        } else if (this.deathAnimationCounter == this.deathSpriteLength) {
          this.deathAnimationCounter = 0;
          this.showDeathAnimation = false;
        }

        this.currentSpriteCooldown = this.ANIMATION_COOLDOWN;
      }
    }
  }
}

