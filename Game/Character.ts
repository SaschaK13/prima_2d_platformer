namespace Game {

  import fudge = FudgeCore;
  
  export class Character extends fudge.Node { 
      private static speedMax: number = 1.5; // units per second
      public speed: fudge.Vector2 =  new fudge.Vector2(0,0);
      public fallSpeed: fudge.Vector2 = new fudge.Vector2(0, -1);
      public gravitySpeed: number = 0;
      public gravity: number = -0.8;
      

      public falling: boolean = true;

      public positionBevorUpdate: fudge.Vector3;
      public positionAfterUpdate: fudge.Vector3;

      public isColliding = false;
      public collissionObject: fudge.Node;
  

      private mesh: fudge.MeshQuad;
      private transcmp: fudge.ComponentTransform;
      private materials: fudge.Material;
      private cmpMesh: fudge.ComponentMesh;
   
    constructor(nodeName: string) {
      super(nodeName);
      this.mesh = new fudge.MeshQuad();
      this.cmpMesh  = new fudge.ComponentMesh(this.mesh);
      this.addComponent(this.cmpMesh);

      this.transcmp = new fudge.ComponentTransform();
      this.addComponent(this.transcmp);

      //fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.update);
    }

    public collideWith(colissionObject: fudge.Node): boolean {
      let colissionObjectPosition = colissionObject.cmpTransform.local.translation;
      let colissionObjectScaling = (colissionObject.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.scaling;

      let characterPosition = this.cmpTransform.local.translation;
      let CharacterScaling = (this.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.scaling;

      if (characterPosition.x < colissionObjectPosition.x + colissionObjectScaling.x &&
        characterPosition.x + CharacterScaling.x > colissionObjectPosition.x &&
        characterPosition.y < colissionObjectPosition.y + colissionObjectScaling.y &&
        characterPosition.y + CharacterScaling.y > colissionObjectPosition.y) {
          this.isColliding = true;
          this.collissionObject = colissionObject;
          return true;
        }else 
        {
          this.isColliding = false;
          return false;
        }

    }

    public handlePhysics()
    {
      if(this.isColliding)
      {
        this.gravitySpeed = 0;
        this.falling = false;
       // this.stand(this.positionBevorUpdate.y, this.positionAfterUpdate.y);
       this.cheatStand();
      }else
      {
        this.falling = true;
      }
      //this.positionBevorUpdate = this.cmpTransform.local.translation;
      if(this.falling){
        let timeFrame: number = fudge.Loop.timeFrameGame / 1000;
        this.gravitySpeed += this.gravity;
        this.cmpTransform.local.translateY((this.speed.y + this.gravitySpeed) * timeFrame);    
      }
      //this.positionAfterUpdate = this.cmpTransform.local.translation;
    }

    private stand(a: number, b: number)
    {
      let pointA = a;
      let pointB = b;
      let distance =pointA - pointB;
      let middlePoint = distance/2;
      fudge.Debug.log(distance);
      if(distance >= 0.005)
      {
        this.cmpTransform.local.translation = new fudge.Vector3(this.cmpTransform.local.translation.x, middlePoint, 0);
        if(this.collideWith(this.collissionObject))
        {
          pointB = middlePoint;
        }else{
          pointA = middlePoint;
        }
        this.stand(pointA, pointB);
      }else{
        this.cmpTransform.local.translation = new fudge.Vector3(this.cmpTransform.local.translation.x, middlePoint , 0);

      }
    }

    private cheatStand()
    {
      if(this.collideWith(this.collissionObject)){
        this.cmpTransform.local.translation = new fudge.Vector3(this.cmpTransform.local.translation.x, this.collissionObject.cmpTransform.local.translation.y, 0 );
        this.cmpTransform.local.translateY((this.collissionObject.cmpTransform.local.scaling.y/2 + this.cmpTransform.local.scaling.y/2))
      }
    }
    
    private update = (_event: fudge.Eventƒ): void => {

      this.positionBevorUpdate = this.cmpTransform.local.translation;
      if(this.falling){
        let timeFrame: number = fudge.Loop.timeFrameGame / 1000;
        this.gravitySpeed += this.gravity;
        this.cmpTransform.local.translateY((this.speed.y + this.gravitySpeed) * timeFrame);    
      }
      this.positionAfterUpdate = this.cmpTransform.local.translation;
      if(this.isColliding)
      {
        this.gravitySpeed = 0;
        this.falling = false;
       // this.stand(this.positionBevorUpdate.y, this.positionAfterUpdate.y);
       this.cheatStand();
      }else
      {
        this.falling = true;
      }
    }

 
  }
}