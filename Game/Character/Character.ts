namespace Game {

  import fudge = FudgeCore;

  export enum CHARACTERSTATE {
    IDLE = "idle",
    WALK = "walk",
    JUMP = "jump"
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
    jump_height: number;
    walk_speed: number;
    attackspeed: number;
  }

  export class Character extends fudge.Node {
      
      public attackCooldown = 0;
      public spriteName: string;
      public direction: DIRECTION = DIRECTION.RIGHT;

      public  collider: Collider;
      public hitbox: Hitbox;

      public oldTransform: fudge.Vector3;

      private JUMP_HEIGHT: number = 6;
      private WALK_SPEED: number = 2;
      private DMG: number = 1;
      private HP: number = 5;
      private ATTACKSPEED: number = 100;

      private gravity: number = -8;
      private velocity: fudge.Vector2 = new fudge.Vector2(0, 0);

      private mesh: fudge.MeshQuad;
      private cmpTrans: fudge.ComponentTransform;
      private cmpMesh: fudge.ComponentMesh;

      private sprites: Sprite[];

      private state: CHARACTERSTATE;

      private isJumping: boolean = false;

    constructor(nodeName: string) {
      super(nodeName);
      this.mesh = new fudge.MeshQuad();
      this.cmpMesh  = new fudge.ComponentMesh(this.mesh);
      this.addComponent(this.cmpMesh);

      this.cmpTrans = new fudge.ComponentTransform();
      this.addComponent(this.cmpTrans);

      this.collider = new Collider(this);
      this.hitbox = new Hitbox(nodeName + "_Hitbox", this, new fudge.Vector2 (this.cmpTransform.local.scaling.x/2,this.cmpTransform.local.scaling.y));
     

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
        this.handleSolidColision(collisionObject);

      }
    }

    public handleSolidColision(collidedObject: CollidedObject): void {

      let collisionObject: fudge.Node = collidedObject.object as fudge.Node;
      let translation: fudge.Vector3 = this.cmpTransform.local.translation;
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
          let newYPosition: number = collisionObject.cmpTransform.local.translation.y - (collisionObject.cmpTransform.local.scaling.y / 2) - (this.cmpTransform.local.scaling.y/2);
          translation.y = newYPosition;
          this.cmpTransform.local.translation = translation;
          this.velocity.y = 0;
          this.isJumping = false;
          break;
        }

        case CollisionDirection.LEFT: {
          let newXPosition: number = collisionObject.cmpTransform.local.translation.x + (collisionObject.cmpTransform.local.scaling.x / 2) + (this.cmpTransform.local.scaling.x/2);
          translation.x = newXPosition;
          this.cmpTransform.local.translation = translation;
          this.velocity.x = 0;
          this.isJumping = false;
          break;
        }

        case CollisionDirection.RIGHT: {
          let newXPosition: number = collisionObject.cmpTransform.local.translation.x - (collisionObject.cmpTransform.local.scaling.x / 2) - (this.cmpTransform.local.scaling.x/2);
          translation.x = newXPosition;
          this.cmpTransform.local.translation = translation;
          this.velocity.x = 0;
          this.isJumping = false;
          break;
        }
      }
    }

    public show(_characterstate: CHARACTERSTATE): void {
      for (let child of this.getChildren()) {
        child.activate(child.name == (this.name + "_" + _characterstate));
      }
    }

    public idle(): void {
      if (!this.isJumping) {
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

    public walk(direction: DIRECTION): void {
      let timeFrame: number = fudge.Loop.timeFrameGame / 1000;

      if (direction == DIRECTION.RIGHT) {
        this.cmpTransform.local.translateX(this.WALK_SPEED * timeFrame);
        if (this.direction != direction) {
          this.cmpTransform.local.rotation = fudge.Vector3.Y(0);
        }
        this.direction = direction;
      } else {
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

    public attack(): void {}

    public die(): void {}

    public takeDmg(dmgTaken: number): void {
      if (this.HP > 0) {
        this.HP -= dmgTaken;
      } else {
        //fudge.Debug.log("dead")
        this.die();
      }
    }

    public fillSpriteMap(): void {
      for (let key of Util.getInstance().spritesMap.get(this.spriteName).keys()) {
        let sprite: Sprite = Util.getInstance().spritesMap.get(this.spriteName).get(key);
        let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
        nodeSprite.activate(false);
        fudge.Debug.log(nodeSprite);
        
  
        nodeSprite.addEventListener(
          "showNext",
          (_event: Event) => { (<NodeSprite>_event.currentTarget).showFrameNext(); },
          true
        );
        this.appendChild(nodeSprite);
      }
      fudge.Debug.log(this.name + " filled");
      this.show(CHARACTERSTATE.IDLE);
    }

    public getStats(): CharacterStats {
      return  {hp: this.HP, dmg: this.DMG, jump_height: this.JUMP_HEIGHT, walk_speed: this.WALK_SPEED, attackspeed: this.ATTACKSPEED}
    }

    public setStats(stats: CharacterStats)
    {
      this.HP = stats.hp
      this.DMG = stats.dmg
      this.JUMP_HEIGHT = stats.jump_height
      this.WALK_SPEED = stats.walk_speed
    }

    public updateStats(stats: CharacterStats): void {
      this.JUMP_HEIGHT += stats.jump_height;
      this.WALK_SPEED += stats.walk_speed;
      this.DMG += stats.dmg;
      this.HP += stats.hp;
      this.ATTACKSPEED += stats.attackspeed;
    }


    private update = (_event: fudge.Eventƒ): void => {
      this.broadcastEvent(new CustomEvent("showNext"));
      this.collider.handleCollsion();
      this.handlePhysics();
      if (this.attackCooldown != 0) {
        this.attackCooldown -= 1;
      }
    }
  }
}
