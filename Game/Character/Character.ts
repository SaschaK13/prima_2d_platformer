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

      private speed: fudge.Vector2 =  new fudge.Vector2(0,0);
      private gravitySpeed: number = 0;
      private gravity: number = -0.8;

      private isColliding: boolean = false;
      private collissionObjects: fudge.Node[];

      private mesh: fudge.MeshQuad;
      private cmpTrans: fudge.ComponentTransform;
      private cmpMesh: fudge.ComponentMesh;

      private state: CHARACTERSTATE;
      private direction: DIRECTIONENUM;

      private sprites: Sprite[];
      private spriteNameMap: spriteName = {}; 
      
      private collider: Collider;
   
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

    }

    private walk() {

    }
    
    private update = (_event: fudge.Eventƒ): void => {
      
      fudge.Debug.log("Character Update");
      this.collider.handleCollsion();
      
      

    }

  }
}