
namespace Game {

  import fudge = FudgeCore;


  export enum CHARACTERSTATE {
    IDLE = "idle",
    WALK = "walk",
    JUMP = "jump"

  }

  export enum DIRECTIONENUM {
    RIGHT = "right",
    LEFT = "left"
  }

  export interface spriteName {
  [type: string]: string;
  }
  
  export class Character extends fudge.Node { 

      private gravity: number = -8;
      private velocity: fudge.Vector2 = new fudge.Vector2(0, 0);

      private mesh: fudge.MeshQuad;
      private cmpTrans: fudge.ComponentTransform;
      private cmpMesh: fudge.ComponentMesh;

      private state: CHARACTERSTATE;
      private direction: DIRECTIONENUM;

      private sprites: Sprite[];
      private spriteNameMap: spriteName = {}; 
      
      private  collider: Collider;
   
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
      let timeFrame = fudge.Loop.timeFrameGame / 1000;
      this.velocity.y += this.gravity * timeFrame;

      //ad velocity to position
      this.cmpTransform.local.translateY(this.velocity.y * timeFrame);
      this.cmpTransform.local.translateX(this.velocity.x * timeFrame);
    }

    public handleStaying()
    {
      let collisionObjects: fudge.Node[] = this.collider.getCollisionObjects();

      for(var i= 0; i < collisionObjects.length; i++) {

        let collisionObject = collisionObjects[i];
        fudge.Debug.log(collisionObject.name)
        if(collisionObject.name == "boden1") {

          fudge.Debug.log("detected plattform")
          let translation = this.cmpTransform.local.translation;
          let newYPosition = collisionObject.cmpTransform.local.translation.y + (collisionObject.cmpTransform.local.scaling.y / 2) + (this.cmpTransform.local.scaling.y/2);
          translation.y = newYPosition;
          this.cmpTransform.local.translation = translation;
          this.velocity.y = 0;
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
      }
    }
*/


    private jump() {
      this.velocity.y -= 5;
    }

    private walk() {
      
    }

    private handleCharacterStates() {

    }
    
    private update = (_event: fudge.Eventƒ): void => {
      
      this.collider.handleCollsion();
      this.handlePhysics();
      
      

    }

  }
}