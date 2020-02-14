
namespace Game {

  import fudge = FudgeCore;

  export enum CHARACTERSTATE {
    DEFAULT = "default",
    IDLE = "idle",
    WALK = "walk",
    JUMP = "jump",
    ATTACK = "attack",
    DEATH = "death",
    HIT = "hit"
  }

  export enum DIRECTION {
    RIGHT = "right",
    LEFT = "left"
  }

  export interface SpriteName {
    [type: string]: string;
  }

  export interface CharacterStats {
    hp: number;
    dmg: number;
    jumpHeight: number;
    walkSpeed: number;
    attackSpeed: number;
  }

  export class Character extends fudge.Node {

    private JUMP_HEIGHT: number;
    private WALK_SPEED: number;
    private DMG: number;
    private HP: number;
    private ATTACKSPEED: number;


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

    public direction: DIRECTION = DIRECTION.RIGHT;

    public collider: Collider;
    public hitbox: Hitbox;

    public isHitted: boolean = false;
    public isJumping: boolean = false;
    public isDead: boolean = false;
    public isAttacking = false;
    public isIdling = false;
    public oldTransform: fudge.Vector3;
    positionX: number;
    scaleX: number;
    positionY: number;

    public showOnetimeCounter: number;
    public currentShowOnetimeCounter: number = 1;
    public isShowingOnetime: boolean = false;
    public showOnetimeNodeSprite: NodeSprite;

    public isLoaded: boolean = false;

    public currentPlatform: Platform;


    constructor(nodeName: string) {
      super(nodeName);
      this.mesh = new fudge.MeshQuad();
      this.cmpMesh = new fudge.ComponentMesh(this.mesh);
      this.addComponent(this.cmpMesh);

      this.cmpTrans = new fudge.ComponentTransform();
      this.addComponent(this.cmpTrans);

      this.collider = new Collider(this);
      this.hitbox = new Hitbox(nodeName + "_Hitbox", this, new fudge.Vector2(this.cmpTransform.local.scaling.x - 0.3, this.cmpTransform.local.scaling.y));

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

    public newShowOneTime(_characterstate: CHARACTERSTATE)
    {
      //activates sprite
      fudge.Debug.log("onetime")

      let spriteMap = Util.getInstance().spritesMap.get(this.spriteName);
      let nodeSprite = spriteMap.get(_characterstate)

      fudge.Debug.log( this.spriteName + " "+ _characterstate + " " + nodeSprite.frames.length +" frames")

      

      for (let child of this.getChildren()) {
        if(child.name == (this.spriteName + "_" + _characterstate))
        {
          child.activate(true);
          this.isShowingOnetime = true;
          this.showOnetimeCounter = (child as NodeSprite).getSprite().frames.length;
          fudge.Debug.log((child as NodeSprite).getSprite().frames.length)
          this.showOnetimeNodeSprite = (child as NodeSprite);
        }else
        {
          child.activate(false);
        }
        
      }
      
    }

    public idle(): void {
      if (!this.isJumping && !this.isDead && !this.isAttacking && !this.isHitted && !this.isShowingOnetime) {
        fudge.Debug.log("show idle")
        this.show(CHARACTERSTATE.IDLE);
        this.isIdling = true;
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
      let timeFrame = fudge.Loop.timeFrameGame / 1000
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

      if (!this.isJumping && !this.isHitted) {
        this.show(CHARACTERSTATE.WALK);
      }
    }

    public attack(): void {}

    public die(): void {
      this.isDead = true;
      this.newShowOneTime(CHARACTERSTATE.DEATH);
      let util: Util = Util.getInstance();
      setTimeout(() => {
         util.gameOver(); 
         this.isShowingOnetime = true;
      }, 1500);
    }

    public takeDmg(dmgTaken: number) {
      if (this.currentDmgCooldown == 0) {
        if (this.HP > 0) {
          if ((this.HP - dmgTaken) >= 0) {
            this.HP -= dmgTaken;
            this.isHitted = true;
            this.newShowOneTime(CHARACTERSTATE.HIT);
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
        if (!(sprite.name == (this.spriteName + "_attack")) && !(sprite.name == (this.spriteName + "_death")) && !(sprite.name == (this.spriteName + "_hit")) ) {
          nodeSprite.addEventListener(
            "showNext",
            (_event: Event) => { (<NodeSprite>_event.currentTarget).showFrameNext(); },
            true
          );
        }else{
          fudge.Debug.log( this.spriteName + " has: " + nodeSprite.getSprite().frames.length + " sprite length on animation: " + key)

        }
        nodeSprite.activate(false);        
        this.appendChild(nodeSprite);
      }
      this.show(CHARACTERSTATE.IDLE);
    }

   
    public getStats(): CharacterStats {
      return { hp: this.HP, dmg: this.DMG, jumpHeight: this.JUMP_HEIGHT, walkSpeed: this.WALK_SPEED, attackSpeed: this.ATTACKSPEED }
    }

    public setStats(stats: CharacterStats): void {
      this.HP = stats.hp;
      this.DMG = stats.dmg;
      this.JUMP_HEIGHT = stats.jumpHeight; 
      this.WALK_SPEED = stats.walkSpeed;
      this.ATTACKSPEED = stats.attackSpeed;
    }

    public updateStats(stats: CharacterStats): void {
      let gui: Gui = Util.getInstance().gui;

      this.HP += stats.hp;
      this.DMG += stats.dmg;
      this.JUMP_HEIGHT += stats.jumpHeight;
      this.WALK_SPEED += stats.walkSpeed;
      this.ATTACKSPEED += stats.attackSpeed;

      gui.updateHealth();
      gui.updateDamage(stats.dmg);
      gui.updateJumpingPower(stats.jumpHeight);
      gui.updateWalkSpeed(stats.walkSpeed);
      gui.updatAttackSpeed(stats.attackSpeed);
    }

    private update = (_event: fudge.Eventƒ): void => {

      if(this.isLoaded){
        this.updateSprites();
        this.collider.handleCollsion();
        this.handlePhysics();
        if (this.attackCooldown != 0) {
          this.attackCooldown -= 1;
        }
        if (this.currentDmgCooldown != 0) {
          this.currentDmgCooldown -= 1;
        } else {
          this.isHitted = false;
        }
      }
   
    }

    private updateSprites(): void {
      if (this.currentSpriteCooldown != 0) {
        this.currentSpriteCooldown --;
      } else {
        fudge.Debug.log("broadcast next")
        this.broadcastEvent(new CustomEvent("showNext"));
        if(this.isShowingOnetime)
        {
          if(this.currentShowOnetimeCounter != this.showOnetimeCounter)
          {
            fudge.Debug.log("is showing one time frame: " + this.currentShowOnetimeCounter)
            this.showOnetimeNodeSprite.showFrameNext();
            this.currentShowOnetimeCounter++;
          }else{
            if(this.showOnetimeNodeSprite)
            {
              this.showOnetimeNodeSprite.activate(false);
            }
            this.isShowingOnetime = false;
            this.isAttacking = false;
            this.isHitted = false;
            this.currentShowOnetimeCounter = 1;
            if(this.isJumping)
            {
              this.show(CHARACTERSTATE.JUMP)
            }else{
              this.idle()
            }
            

        }
          
      }
      this.currentSpriteCooldown = this.ANIMATION_COOLDOWN;
    }
  }
}

