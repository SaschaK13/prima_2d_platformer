namespace Game {

  import fudge = FudgeCore;
  
  export class Character extends fudge.Node { 
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
    }
  }
}