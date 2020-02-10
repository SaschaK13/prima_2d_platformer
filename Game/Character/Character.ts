
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

      private JUMP_HEIGHT = 4;
      private WALK_SPEED = 1;

      private gravity: number = -8;
      private velocity: fudge.Vector2 = new fudge.Vector2(0, 0);

      private mesh: fudge.MeshQuad;
      private cmpTrans: fudge.ComponentTransform;
      private cmpMesh: fudge.ComponentMesh;

      private state: CHARACTERSTATE;
      private direction: DIRECTION;

      private sprites: Sprite[];
      private spriteNameMap: spriteName = {};

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

      fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.update);
    }

    public handlePhysics()
    {
      this.handleVelocity();
      this.handleStaying();
    }

    public handleVelocity(): void {
      this.oldTransform = this.cmpTransform.local.translation;
      let timeFrame = fudge.Loop.timeFrameGame / 1000;
      this.velocity.y += this.gravity * timeFrame;

      //ad velocity to position
      this.cmpTransform.local.translateY(this.velocity.y * timeFrame);
      this.cmpTransform.local.translateX(this.velocity.x * timeFrame);

    }

    public handleStaying()
    {
      let collisionObjects: CollidedObject[] = this.collider.getCollisionObjects();

      for(var i= 0; i < collisionObjects.length; i++) {

        let collisionObject: Platform = collisionObjects[i].object as Platform;
        if(collisionObject.type == EnvironmentType.PLATFORM ) {

          let translation = this.cmpTransform.local.translation;
          let newYPosition = collisionObject.cmpTransform.local.translation.y + (collisionObject.cmpTransform.local.scaling.y / 2) + (this.cmpTransform.local.scaling.y/2);
          translation.y = newYPosition;
          this.cmpTransform.local.translation = translation;
          this.velocity.y = 0;
          this.isJumping = false;
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
      }else
      {
        this.cmpTransform.local.translateX(-(this.WALK_SPEED * timeFrame))

      }
    }

    private handleCharacterStates() {

    }

    private update = (_event: fudge.Eventƒ): void => {

      this.collider.handleCollsion();
      this.handlePhysics();






    }

  }
}
