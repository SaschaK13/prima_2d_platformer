namespace Game {

  import fudge = FudgeCore;
  
  export class Character extends fudge.Node { 
      public mesh: fudge.MeshQuad = new fudge.MeshQuad;
      public materials: fudge.Material;
   
    constructor(nodeName: string) {
      super(nodeName);
      let cmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(this.mesh);
      this.addComponent(cmpMesh);

      let cmpTransform: fudge.ComponentTransform = new fudge.ComponentTransform();
      this.addComponent(cmpTransform);
    }
  }
}