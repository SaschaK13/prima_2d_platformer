
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
      public direction: DIRECTION = DIRECTION.RIGHT;

      private sprites: Sprite[];
      private spriteNameMap: spriteName = {};

      private  collider: Collider;
      private hitbox: Hitbox;

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
      this.hitbox = new Hitbox(nodeName + "_Hitbox", this, new fudge.Vector2 (this.cmpTransform.local.scaling.x/2,this.cmpTransform.local.scaling.y))

      fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.update);
    }

    public handlePhysics()
    {
      this.handleVelocity();
      this.reactToCollison();
    }

    public handleVelocity(): void {
      this.oldTransform = this.cmpTransform.local.translation;
      let timeFrame = fudge.Loop.timeFrameGame / 1000;
      this.velocity.y += this.gravity * timeFrame;

      //ad velocity to position
      this.cmpTransform.local.translateY(this.velocity.y * timeFrame);
      this.cmpTransform.local.translateX(this.velocity.x * timeFrame);

    }


    public reactToCollison()
    {
      let collisionObjects: CollidedObject[] = this.collider.getCollisionObjects(); 

      for(var i = 0; i < collisionObjects.length; i++)
      {
        let collisionObject = collisionObjects[i];
       /* switch(collisionObject.collisionType){
          case CollisionType.ENVIRONMENT: {
            if((collisionObject.object as Environment).type == EnvironmentType.PLATFORM)
            {
              this.handlePlatformColission(collisionObject)
            }
          }
        }*/

        this.handleSolidColision(collisionObject)

      }

    }

    public handleSolidColision(collidedObject: CollidedObject)
    {

      let collisionObject: fudge.Node = collidedObject.object as fudge.Node;
      let translation = this.cmpTransform.local.translation;

      switch(collidedObject.collisionDirecton){
        case CollisionDirection.BOTTOM: {
          let newYPosition = collisionObject.cmpTransform.local.translation.y + (collisionObject.cmpTransform.local.scaling.y / 2) + (this.cmpTransform.local.scaling.y/2);
          translation.y = newYPosition;
          this.cmpTransform.local.translation = translation;
          this.velocity.y = 0;
          this.isJumping = false;
          break;
        }
        case CollisionDirection.TOP: {
          let newYPosition = collisionObject.cmpTransform.local.translation.y - (collisionObject.cmpTransform.local.scaling.y / 2) - (this.cmpTransform.local.scaling.y/2);
          translation.y = newYPosition;
          this.cmpTransform.local.translation = translation;
          this.velocity.y = 0;
          this.isJumping = false;
          break;

        }
        case CollisionDirection.LEFT: {
          let newXPosition = collisionObject.cmpTransform.local.translation.x + (collisionObject.cmpTransform.local.scaling.x / 2) + (this.cmpTransform.local.scaling.x/2);
          translation.x = newXPosition;
          this.cmpTransform.local.translation = translation;
          this.velocity.x = 0;
          this.isJumping = false;
          break;

        }

        case CollisionDirection.RIGHT: {
          let newXPosition = collisionObject.cmpTransform.local.translation.x - (collisionObject.cmpTransform.local.scaling.x / 2) - (this.cmpTransform.local.scaling.x/2);
          translation.x = newXPosition;
          this.cmpTransform.local.translation = translation;
          this.velocity.x = 0;
          this.isJumping = false;
          break;
        }
      }
     
    }

  

    public generateSprites() {

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


    public jump() {
      if(!this.isJumping)
      {
        this.isJumping = true;
        this.velocity.y += this.JUMP_HEIGHT;
      }

    }

    public walk(direction: DIRECTION) {
      let timeFrame = fudge.Loop.timeFrameGame / 1000;

      if(direction == DIRECTION.RIGHT)
      {
        this.cmpTransform.local.translateX(this.WALK_SPEED * timeFrame)
        if(this.direction != direction)
        {
          this.cmpTransform.local.rotation = fudge.Vector3.Z(0)
        }
        this.direction = direction;
      }else
      {
        this.cmpTransform.local.translateX(-(this.WALK_SPEED * timeFrame))
        if(this.direction != direction)
        {
          this.cmpTransform.local.rotation = fudge.Vector3.Z(180)
        }
        this.direction = direction;
      }

      //this.hitbox.positionHitbox(this)
    }

    private handleCharacterStates() {

    }

    private update = (_event: fudge.Eventƒ): void => {

      this.collider.handleCollsion();
      this.handlePhysics();
    }

  }
}
