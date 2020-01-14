namespace Game {

  import fudge = FudgeCore;
  
  export class Character extends fudge.Node { 
      cmpTransform: fudge.ComponentTransform;
      private mesh: fudge.MeshQuad;
      private materials: fudge.Material;
      private cmpMesh: fudge.ComponentMesh;
   
    constructor(nodeName: string) {
      super(nodeName);
      this.mesh = new fudge.MeshQuad();
      this.cmpMesh  = new fudge.ComponentMesh(this.mesh);
      this.addComponent(this.cmpMesh);

      this.cmpTransform = new fudge.ComponentTransform();
      this.addComponent(this.cmpTransform);
    }
  }
}