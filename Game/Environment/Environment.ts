namespace Game {

  import fudge = FudgeCore;

  export class Environment extends fudge.Node{
    private static mesh: fudge.MeshQuad = new fudge.MeshQuad;
    private static materials: fudge.Material;

    constructor(nodeName: string) {
      super(nodeName);
      let cmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(Environment.mesh);
      this.addComponent(cmpMesh);

      let cmpTransform: fudge.ComponentTransform = new fudge.ComponentTransform();
      this.addComponent(cmpTransform);
    }

  }
}