namespace Game {

  import fudge = FudgeCore;
  
  export class Character extends fudge.Node { 
      private static speedMax: number = 1.5; // units per second
      public speed: number = 0;
      public fallSpeed: fudge.Vector2 = new fudge.Vector2(0, -1);

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

      fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.update);
    }

    private update = (_event: fudge.Eventƒ): void => {
      let timeFrame: number = fudge.Loop.timeFrameGame / 1000;
      this.cmpTransform.local.translate(new fudge.Vector3(this.fallSpeed.x, this.fallSpeed.y * timeFrame, 0));
      //fudge.Debug.log(this.fallSpeed);
      this.cmpTransform.local.translateX(this.speed * timeFrame);
      this.broadcastEvent(new CustomEvent("showNext"));
    }
  }
}