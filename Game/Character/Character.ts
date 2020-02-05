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
      private collissionObject: fudge.Node;

      private mesh: fudge.MeshQuad;
      private cmpTrans: fudge.ComponentTransform;
      private cmpMesh: fudge.ComponentMesh;

      private state: CHARACTERSTATE;
      private direction: DIRECTIONENUM;

      private sprites: Sprite[];
      private spriteNameMap: spriteName = {};   
   
    constructor(nodeName: string) {
      super(nodeName);
      this.mesh = new fudge.MeshQuad();
      this.cmpMesh  = new fudge.ComponentMesh(this.mesh);
      this.addComponent(this.cmpMesh);

      this.cmpTrans = new fudge.ComponentTransform();
      this.addComponent(this.cmpTrans);
    }

    public collideWith(colissionObject: fudge.Node): boolean {
      let colissionObjectPosition: fudge.Vector3 = colissionObject.cmpTransform.local.translation;
      let colissionObjectScaling: fudge.Vector3 = (colissionObject.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.scaling;

      let characterPosition: fudge.Vector3 = this.cmpTransform.local.translation;
      let characterScaling: fudge.Vector3 = (this.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.scaling;

      if (characterPosition.x < colissionObjectPosition.x + colissionObjectScaling.x &&
        characterPosition.x + characterScaling.x > colissionObjectPosition.x &&
        characterPosition.y < colissionObjectPosition.y + colissionObjectScaling.y &&
        characterPosition.y + characterScaling.y > colissionObjectPosition.y) {
          this.isColliding = true;
          this.collissionObject = colissionObject;
          return true;
        } else {
          this.isColliding = false;
          return false;
        }

    }

    public handlePhysics()
    {

    }

    public generateSprites() {

    }
    
    private cheatStand()
    {
      if(this.collideWith(this.collissionObject)){
        this.cmpTransform.local.translation = new fudge.Vector3(this.cmpTransform.local.translation.x, this.collissionObject.cmpTransform.local.translation.y, 0 );
        this.cmpTransform.local.translateY((this.collissionObject.cmpTransform.local.scaling.y/2 + this.cmpTransform.local.scaling.y/2))
      } else {
        //this.cmpTransform.local.translateY(-(this.cmpTransform.local.scaling.y)/2)
      }
    }
    
    private update = (_event: fudge.Eventƒ): void => {
      if (this.falling) {
        let timeFrame: number = fudge.Loop.timeFrameGame / 1000;
        this.gravitySpeed += this.gravity;
        this.cmpTransform.local.translateY((this.speed.y + this.gravitySpeed) * timeFrame);    
      }
      if (this.isColliding) {
        this.gravitySpeed = 0;
        this.falling = false;
       // this.stand(this.positionBevorUpdate.y, this.positionAfterUpdate.y);
       this.cheatStand();
      }else
      {
        this.falling = true;
        //test
      }
    }

    private jump() {


    }

    private walk() {

    }
 
  }
}