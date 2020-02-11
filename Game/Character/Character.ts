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

  export interface spriteName {
  [type: string]: string;
  }

  export class Character extends fudge.Node {
      private JUMP_HEIGHT = 6;
      private WALK_SPEED = 2;

      private gravity: number = -8;
      private velocity: fudge.Vector2 = new fudge.Vector2(0, 0);

      private mesh: fudge.MeshQuad;
      private cmpTrans: fudge.ComponentTransform;
      private cmpMesh: fudge.ComponentMesh;

      private state: CHARACTERSTATE;
      private direction: DIRECTION;

      private sprites: Sprite[];
      private spriteNameMap: spriteName = {};
      private textureImage: fudge.TextureImage;

      private  collider: Collider;

      private isJumping: boolean = false;

      public oldTransform: fudge.Vector3;

    constructor(nodeName: string) {
      super(nodeName);
      this.mesh = new fudge.MeshQuad();
      this.cmpMesh  = new fudge.ComponentMesh(this.mesh);
      this.addComponent(this.cmpMesh);

      this.cmpTrans = new fudge.ComponentTransform();
      this.addComponent(this.cmpTrans);

      this.collider = new Collider(this);

      this.textureImage = Util.getInstance().getTextureImageByName(nodeName);
      fudge.Debug.log(this.textureImage);
      this.generateSprites();
      this.fillSpriteMap();

      this.show(CHARACTERSTATE.IDLE);
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
        let collisionObject: CollidedObject = collisionObjects[i];
        switch ((collisionObject.object as Environment).type) {
          case EnvironmentType.PLATFORM: {
            this.handlePlatformColission(collisionObject);
          }
        }
      }
    }

    public handlePlatformColission(collidedObject: CollidedObject): void {
      let collisionObject: Platform = collidedObject.object as Platform;
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
        child.activate(child.name == _characterstate);
      }
    }

    public generateSprites(): void {
      this.sprites = [];
      let sprite: Sprite = new Sprite(CHARACTERSTATE.WALK);
      sprite.generateByGrid(this.textureImage, fudge.Rectangle.GET(2, 104, 68, 64), 6, fudge.Vector2.ZERO(), 64, fudge.ORIGIN2D.CENTER);
      this.sprites.push(sprite);

      sprite = new Sprite(CHARACTERSTATE.IDLE);
      sprite.generateByGrid(this.textureImage, fudge.Rectangle.GET(8, 20, 45, 80), 4, fudge.Vector2.ZERO(), 64, fudge.ORIGIN2D.CENTER);
      fudge.Debug.log(this.cmpTransform.local.scaling.x);
      this.sprites.push(sprite);

      sprite = new Sprite(CHARACTERSTATE.JUMP);
      sprite.generateByGrid(this.textureImage, fudge.Rectangle.GET(204, 183, 45, 72), 4, fudge.Vector2.ZERO(), 64, fudge.ORIGIN2D.CENTER);
      this.sprites.push(sprite);
    }

    public fillSpriteMap(): void {
      for (let sprite of this.sprites) {
        let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
        nodeSprite.activate(false);

        nodeSprite.addEventListener(
          "showNext",
          (_event: Event) => { (<NodeSprite>_event.currentTarget).showFrameNext(); },
          true
        );
        this.appendChild(nodeSprite);
      }
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

    public jump(): void {
      if (!this.isJumping) {
        this.isJumping = true;
        this.velocity.y += this.JUMP_HEIGHT;
        this.show(CHARACTERSTATE.JUMP);
      }
    }

    public walk(direction: DIRECTION): void {
      let timeFrame: number = fudge.Loop.timeFrameGame / 1000;
      this.show(CHARACTERSTATE.WALK);
      if (direction == DIRECTION.RIGHT) {
        this.cmpTransform.local.translateX(this.WALK_SPEED * timeFrame);
      } else {
        this.cmpTransform.local.translateX(-(this.WALK_SPEED * timeFrame));
      }
    }

    private handleCharacterStates() {}

    private update = (_event: fudge.Eventƒ): void => {
      this.broadcastEvent(new CustomEvent("showNext"));
      this.collider.handleCollsion();
      this.handlePhysics();
    }
  }
}
